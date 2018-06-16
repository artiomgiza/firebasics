  document.addEventListener("DOMContentLoaded", function(event) {
    const app = firebase.app();
    const db = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    db.settings(settings);
    const myPost = db.collection('posts').doc('firstpost');




  });

function updateFile(files) {
    const storageRef = firebase.storage().ref();
    const horseRef = storageRef.child('horse.jpg');
   
    const file = files.item(0);
    const task = horseRef.put(file);

    task.then(snapshot => {
        console.log(snapshot);
        // const url = snapshot.downloadURL      

        horseRef.getDownloadURL().then(function(url) {
            console.log(url);
            document.getElementById('imgUpload').setAttribute('src',url)
          });

    })
}

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(result => {
        const user = result.user;
        document.write(`Hello, ${user.displayName}`)
        console.log("user -->",user);
    })
    .catch(console.log)


}