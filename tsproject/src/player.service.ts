import AudioRecorder from 'audio-recorder-polyfill';
import { DotNetSubject } from './DotNetSubject';

export class PlayerService {

  private readonly maxRecordTime = 20000;
  private timer: any;
  private mediaRecorder: any = null;

  //public urls: { [key: string]: Blob } = {};

  public isLoading = false;
  public isPlaying = false;
  public isRecording = false;
  public audioElement: HTMLAudioElement | undefined = new Audio();
  public canRecord = true;

  constructor() {
    (<any>window).MediaRecorder = AudioRecorder;
  }

  public get isBusy() {
    return this.isPlaying || this.isRecording || this.isLoading;
  }

  public playUrl(s: any, url: string) {
    const subject = new DotNetSubject(s);

    this.isLoading = true;
    this.audioElement = new Audio(url);
    this.audioElement.onloadeddata = () => {
      this.isLoading = false;
      this.isPlaying = true;
    };
    this.audioElement.onended = () => {
        //console.log("play end", url);
        this.isPlaying = false;
        subject.next();
        subject.complete();
        this.audioElement = undefined;
    };
    this.audioElement.onerror = (err) => {
      this.isLoading = false;
      console.error("Error playing: " + url);
      subject.error("Error playing: " + url);
      this.isPlaying = false;
      this.audioElement = undefined;
    };
    //console.log("play", url.length);
    this.audioElement.play();
    return subject;
  }

  public stopPlaying() {
    // There is no 'stop' method in the Audio object, so we have to do it this way
    try {
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        this.isPlaying = false;
        this.audioElement = undefined;
      }
    } catch(err) {
      console.error("stopPlaying", err);
    }
  }

  // : Subject<{ blob: Blob; url: string }>
  public record(s: any) {
    //console.log("Player.recording");

    const subject = new DotNetSubject(s);

    this.isLoading = true;

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const options = { audioBitsPerSecond: 64000, mimeType: 'audio/webm' };
      let recordedChunks: any[] = [];
      this.mediaRecorder = new (<any>window).MediaRecorder(stream, options);

      this.mediaRecorder.addEventListener('start', (e: any) => {
        //console.log("onstart");
        this.isRecording = true;
        this.isLoading = false;
        this.timer = setTimeout(() => this.stopRecording(), this.maxRecordTime);
      });

      this.mediaRecorder.addEventListener('dataavailable', (e: any) => {
         //console.log("ondataavailable", e.data);
        if (e.data.size > 0) {
            recordedChunks.push(e.data);
        }
      });

      this.mediaRecorder.addEventListener('stop', (e: any) => {
        // This gets called when the stopRecording() method gets called which is
        // called when the user clicks on the stop icon.
        // console.log("onstop", this.isLoading);
        this.isLoading = true;
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(recordedChunks, { type: recordedChunks[0].type });
        blob.arrayBuffer().then(buffer => {
          var url = URL.createObjectURL(blob);
          //this.urls[url] = blob;
          //const fb = new Firebase();
          //fb.saveBlob('abcd', blob);

          subject.next({
            url: url,
            type: blob.type,
            blob64: btoa(String.fromCharCode(...new Uint8Array(buffer)))
          });
          subject.complete();
          this.isLoading = false;
        });
      });
      this.mediaRecorder.start();
      this.isRecording = true;
      this.isLoading = false;
    },
    (err) => {
      subject.error(err.toString());
    });

    return subject;
  }


  public stopRecording() {
    this.isRecording = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }

    if (this.mediaRecorder) {
        this.mediaRecorder.stop();
    }
  }

}
