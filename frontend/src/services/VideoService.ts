import axios from 'axios';
import { Video } from '../interfaces/Video';

export class VideoService {

  public async getVideoUrl(id: string): Promise<Video> {
    return new Promise<Video>((resolve, reject) => {
      axios.get<Video>(`${window['API']}video/${id}`).then(response => {
        if (response.data)
          resolve(response.data)
        else
          reject(response.statusText)
      }).catch(error => reject(error))
    })
  }

  public async getVideos(): Promise<Video[]> {
    return new Promise<Video[]>((resolve, reject) => {
      axios.get<Video[]>(`${window['API']}videos`).then(response => {
        if (response.data)
          resolve(response.data)
        else
          reject(response.statusText)
      }).catch(error => reject(error))
    })
  }

  public async upload(data: FormData, progressCallback?: Function): Promise<Video> {
    return new Promise<Video>((resolve, reject) => {
      axios.post<Video>(`${window['API']}upload`, data, {
        onUploadProgress: (event) => {
          if(progressCallback)
            progressCallback(Math.round((event.loaded * 100) / event.total))
        }
      }).then(response => {
        if (response.data)
          resolve(response.data)
        else
          reject(response.statusText)
      }).catch(error => reject(error))
    })
  }
}