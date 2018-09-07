import axios from 'axios';
import { Video } from '../model/Video';

export class VideoService {
  public async getVideoUrl(id: string): Promise<Video> {
    return new Promise<Video>((resolve, reject) => {
      axios.get<Video>(`${window['API']}video/${id}`).then(response => {
        if (response.status === 200)
          resolve(response.data)
        else
          reject(response.statusText)
      }).catch(error => reject(error))
    })
  }

  public async getVideos(): Promise<Video[]> {
    return new Promise<Video[]>((resolve, reject) => {
      axios.get<Video[]>(`${window['API']}videos`).then(response => {
        if (response.status === 200)
          resolve(response.data)
        else
          reject(response.statusText)
      }).catch(error => reject(error))
    })
  }
}