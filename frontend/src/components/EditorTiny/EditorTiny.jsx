import { Editor } from '@tinymce/tinymce-react'
import React from 'react'

const EditorTiny = ({description,handleEditorChange}) => {
  return (
    <>
         <Editor
                      apiKey="r38xmpya9ojgw292yp0uptd1vxm7e4a2948nj8uy6zmdzzwb" // Optional: API key if you want to use TinyMCE Cloud
                      value={description}
                      onEditorChange={handleEditorChange}
                      init={{
                         valid_elements: '*[*]',
                        height: 400,
                        menubar: true,
                        plugins: [
                          
                          "advlist autolink lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code help wordcount",
                          "textcolor", // Thêm plugin textcolor để hỗ trợ màu chữ
                        ],
                        toolbar:
                          "undo redo | formatselect | bold italic forecolor backcolor | \
                     alignleft aligncenter alignright alignjustify | \
                     bullist numlist outdent indent | removeformat | help",
                      }}
                      
                    />
    </>
  )
}

export default EditorTiny
