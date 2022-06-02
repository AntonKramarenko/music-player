import React from 'react'
import './file.scss'
import dirLogo from '../../../../assets/img/dir.svg'
import fileLogo from '../../../../assets/img/file.svg'
import { useDispatch, useSelector } from 'react-redux'
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer'
import { deleteFile, downloadFile } from '../../../../actions/file'

export default function File({file}) {

  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)

  function openHandler(file){
    if(file.type ==='dir'){
      dispatch(pushToStack(currentDir))
      dispatch(setCurrentDir(file._id))  
    }
  }

  function downloadClickHandler(event){
    event.stopPropagation()
    downloadFile(file)
  }

  function deleteClickHandler(event){
    event.stopPropagation()
    dispatch(deleteFile(file))
  }



  return (
    <div className='file' onClick={() => openHandler(file)}>
      <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img" />
      <div className="file__name">{file.name}</div>
      <div className="file__date">{file.date.slice(0,10)}</div>
      <div className="file__size">{file.size}</div>
      { file.type !== 'dir' && <button onClick={(event) => downloadClickHandler(event)} className='file__btn file__download'>Download</button>}
      <button onClick={(event) => deleteClickHandler(event)} className='file__btn file__delete'>Delete</button>

    </div>
  )
}