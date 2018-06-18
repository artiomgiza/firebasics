let sychOwner;

document.addEventListener("DOMContentLoaded", function(event) {

    const app = firebase.app();
    const db = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    db.settings(settings);

    sychOwner = db.collection('sych_owner').doc('current_owner');

    firebase.auth().onAuthStateChanged(function(user) {
        sychOwner.onSnapshot(owner => {
            let owner_name = toTitleCase(owner.data().name)
            let image_url = owner.data().image_url

            if (user) {
                // User is signed in.
                let user_name = toTitleCase(user.displayName)
                document.getElementById('content').innerHTML = `
                    <div>
                        ${owning_message(user_name, owner_name, image_url)}
                        <br>
                        <button onclick="googleLogout()">Logout</button>
                    </div>
                `
            } else {
                // No user is signed in.
                document.getElementById('content').innerHTML = `
                    <div>${greeing()}</div>
                    <div>Now ${owner_name} owns the sych </div>
        
                    <div>To make it yours, please login and get it</div>
                    <button class="button button-blue" onclick="googleLogin()">Login with Google</button>
                `         
            }
        })
    });
});

function owning_message(user_name, owner_name, image_url) {
    if(user_name === owner_name) {
        return `
            <h4>Wo-hoo, ${user_name}!</h4> 
            <h3>Now it's yours sych!</h3>
            <img style="max-width: 350px;" src="${image_url}" alt="sych">
        `
    } else {
        return `
            <h4>Hi, ${user_name}.</h4>
            <h4>The sych is now in <big>${owner_name}'s</big> heands... </h4>
            
            <button class="button button-green" onclick="updateSychOwner('${user_name}')">Get it</button>
        `
    }
}

function updateSychOwner(new_owner) {
    // generate image:
    let img_url= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrtIBi7DWXolIDccv3dhaAap1PT8oFRi3XcUnfq-Z8kLX0_8BH&#10;"
    
    let rand = Math.floor((Math.random() * 10) + 1)
    if (rand === 1) {
        img_url= "https://cdn.theatlantic.com/assets/media/img/photo/2017/02/a-superb-owl-sunday/s07_28749265634/main_900.jpg?1486280334"
    } else if (rand === 2) { 
        img_url= "https://cdn.theatlantic.com/assets/media/img/photo/2018/02/superb-owl-sunday-ii/s24_576310213/main_900.jpg?1517727256"
    }

    sychOwner.set({
        "name": new_owner,
        "image_url":img_url
    })
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(result => {
        const user = result.user;
        parseLoggedIn(user)
        console.log("user -->",user);
    })
    .catch(console.log)
}

function googleLogout() {
    firebase.auth().signOut().then(function() {
        console.log("logged out successfuly")
        location.reload();
      }, function(error) {
        console.log("can't logout", error)
      });
}


function greeing() {
    var myDate = new Date();
    var hrs = myDate.getHours();

    var greet;
    if (hrs < 12)
        greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
        greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
        greet = 'Good Evening';

    return greet
}