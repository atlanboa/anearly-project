from bluetooth import *
import pyautogui as pg
import cv2, glob, dlib
import requests
import json

pg.PAUSE = 0.01
pg.FAILSAFE = False
url = 'http://192.168.100.60:9999/api/person/'
device_number = 1
age_list = ['(0, 2)','(4, 6)','(8, 12)','(15, 20)','(25, 32)','(38, 43)','(48, 53)','(60, 100)']
age_avg = [1, 5, 10, 17, 28, 40, 50, 80]
gender_list = ['Male', 'Female']

rasp_socket=BluetoothSocket( RFCOMM )
rasp_socket.connect(("00:19:10:08:58:C7", 1))
print("bluetooth Connected!")
chk = True
while chk:
    try:
        #msg = input("send message : ")
        #if msg == "end":
        #    break
        #rasp_socket.send(msg)
        #display size 1024 768
        s = ['button', 'sitck x', 'stick y']
        a = list(rasp_socket.recv(1024))    
        for i in range(1, len(a)-1, 3):
            px, py = a[i] - 127, 127 - a[i+1]
            cx, cy = pg.position()
            nx, ny = cx + px, cy+py
            pg.moveTo(nx, ny)
            if a[i-1]:
                # print(a[i-1])
                #button1 = 16
                if a[i-1] == 16:  
                    detector = dlib.get_frontal_face_detector()            
                    age_net = cv2.dnn.readNetFromCaffe(
                                    'models/deploy_age.prototxt', 
                                    'models/age_net.caffemodel'
                                )
                    gender_net = cv2.dnn.readNetFromCaffe(
                                    'models/deploy_gender.prototxt', 
                                    'models/gender_net.caffemodel'
                                )
                    cap = cv2.VideoCapture("http://192.168.137.252:8080/video")
                    ret, img = cap.read()            
                    cap.release()
                    faces = detector(img)
                    print(len(faces))
                    if len(faces):
                        x1, y1, x2, y2 = faces[0].left(), faces[0].top(), faces[0].right(), faces[0].bottom()
                        face_img = img[y1:y2, x1:x2].copy()
                        blob = cv2.dnn.blobFromImage(
                            face_img,
                            scalefactor=1,
                            size=(227, 227),
                            mean=(78.4263377603, 87.7689143744, 114.895847746),
                            swapRB=False,
                            crop=False)
              
                        # predict gender
                        gender_net.setInput(blob)
                        gender_preds = gender_net.forward()
                        gender = gender_list[gender_preds[0].argmax()]
              
                        # predict age
                        age_net.setInput(blob)
                        age_preds = age_net.forward()
                        age = age_list[age_preds[0].argmax()]
              
                        print(gender, age)
                        
                        data = {
                            'gender': gender_list.index(gender)+1,
                            'age': age_avg[age_list.index(age)],
                            'device': device_number,
                        }
                        print(json.dumps(data))
                        requests.post(url, json=data)
                elif a[i-1] == 32:
                    chk = False
                    break
                else:
                    pg.click()
        ## pg.click()
        # print(a)
    except:
        continue
rasp_socket.close()
