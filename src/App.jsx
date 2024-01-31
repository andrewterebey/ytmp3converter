import axios from "axios";
import { useRef, useState } from "react"
import { youtube_parser } from "./utils";

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log(inputUrlRef.current.value);
    const youtubeId = youtube_parser(inputUrlRef.current.value);
    //console.log(youtubeId);

    const options = {
      method: 'get',
      url: 'https://youtube-mp3-download1.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-mp3-download1.p.rapidapi.com'
      },
      params: {
        id: youtubeId
      }
    }
    axios(options)
      .then(res => setUrlResult(res.data.link))
      .catch(err => console.log(err))

      inputUrlRef.current.value = '';
  }

  return (
    <div className="App">
      <span className="logo">youtubeToMp3</span>
      <section className="content">
        <h1 className="content_title">YouTube to MP3 Converter</h1>
        <p className="content_description">
          Youtube link to high quality mp3 file converter
        </p>
        <form onSubmit={handleSubmit} className="form">
          <input ref={inputUrlRef} placeholder="Paste url here..." className="form_input" type="text"/>
          <button type="submit" className="form_button">Submit</button>
        </form>

        
        {urlResult ? <a target="_blank" rel="noreferrer" href={urlResult} className="download_btn">Download MP3</a> : ''}
      </section>
    </div>
  )
}

export default App
