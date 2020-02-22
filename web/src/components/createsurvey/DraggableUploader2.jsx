import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import * as fileAPI from "../../apis/fileAPI";


const useStyles = makeStyles(theme => ({
  fileInput: {
    width: "100%",
    height: "100%",
  },
  fileInputContainer: {
    maxWidth: 800,
    minWidth: 400,
    margin: "10px auto",
    border: "solid black",
  },
  button: {
    display: "inline"
  },
  thumbnail: {
    maxWidth: 50,
    maxHeight: 50,
  }
}));


export default function CreateSurveyTable(props) {
  const classes = useStyles();
  // const asdf = (e) => {
  //   e.preventDefault();

  //   console.log(e.target)
  // }

  // 이미지 업로드 요청을 보낸다
  const fileUpload = () => {
    if (document.querySelector("#file-browser-input").files[0]) {
      let form = new FormData();
      form.append("image", document.querySelector("#file-browser-input").files[0]);
      fileAPI.imageUpload(form).then(response => {
        // console.log(response)
        const newImg = response.data.data.link
        if (newImg) {
          // 이미지 업로드 완료되면 newImg에 이미지 url을 저장한다          
          var image
          // 저장된 이미지를 저장한다.
          if (props.image === "") {
            image = newImg
          }
          else {
            image = props.image + ' ' + newImg
          }
          props.imageChange(image)
        }
      }).catch(error => {
        // console.log(error)
      })

    }
  }

  const imageDelete = (event) => {    
    // let tempRows = props.survey.filter(row => {
    //   return row.display_order !== display_order;
    // });

    let imgList = props.image.split(" ").filter(img => {
      return img !== event.target.dataset.image
    });
    props.imageChange(imgList.join(' '))
  }

  return (
    <form method="POST">
      <div className={classes.fileInputContainer}>
        <input
          className={classes.fileInput}
          type="file"
          accept=".jpg, .jpeg"
          id="file-browser-input"
          name="file-browser-input"
          // ref={input => this.fileInput = input}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          // onDrop={this.onFileLoad.bind(this)}
        />

      </div>
      {
        props.image!==""
          ?
            props.image.split(" ").map((img, idx) => {
              return (
                <React.Fragment>
                  <img
                    className={classes.thumbnail}
                    src={img}
                    key={"img-"+img}
                    alt="..."
                  />
                  <input
                    type="button"
                    onClick={imageDelete}
                    data-image={img}
                    value="x"
                    key={"btn-"+img}
                  />
                </React.Fragment>)
            })
          :
            ""
      }
    <br />
      <input type="button" onClick={fileUpload} value="업로드" />
    </form>
  )
}