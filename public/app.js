  document.addEventListener("DOMContentLoaded", function(event) {
    const app = firebase.app();
    const db = firebase.firestore();
    const myPost = db.collection('posts').doc('firstpost');


    const productsRef = db.collection('products');
    const query = productsRef.where('price', '>', 10).orderBy('price', 'desc').limit(1)
    query.get()
    .then(products => {
        products.forEach(product => {
            data = product.data();
            document.write(`${data.name} at ${data.price} <br>`)
        })
    })


    // here we can do simple .get().then(...) -> this allows us to get the data
    // without listening. onSnapshot will listen to the data changes...

    // myPost.onSnapshot(doc => {
    //     // onSnapshot returns the stream, each time doc is changed - it will be passed to this code:
    //     const data = doc.data();
    //     document.getElementById("title").innerHTML = data.title 
    // })
  });

function updatePost(e) {
    const db = firebase.firestore();
    const myPost = db.collection('posts').doc('firstpost');
    myPost.update( { title: e.target.value })
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