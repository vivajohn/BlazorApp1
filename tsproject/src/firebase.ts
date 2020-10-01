declare var firebase: any;

export class Firebase {

  saveBlob(subject: any, uid: string, prompt: any, blob: any) {
    debugger;
    const db: any = firebase.firestore();
    const array = new Uint8Array(blob.data64);
    const b = firebase.firestore.Blob.fromUint8Array(array);
    const obj = { blob: 'b', type: blob.type }

    const key = `${uid}_${prompt.id}`;
    db.collection('blobs').doc(key).set(obj).then(() => {
      subject.OnNext(null);
      subject.OnCompleted();
    }, (err: any) => {
        console.error(err);
    });
  }

  //saveBlob1(key: string, blob: any) {
  //  debugger;
  //  const db: any = firebase.firestore();
  //  blob.arrayBuffer().then((buffer: any) => {
  //    const array = new Uint8Array(buffer);
  //    const b = firebase.firestore.Blob.fromUint8Array(array);
  //    const obj = { blob: b, type: blob.type }
  //    const x = db.collection('blobs').doc(key).set(obj);
  //    return x;
  //  });
  //}
}