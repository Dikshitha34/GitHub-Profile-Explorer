document.addEventListener("DOMContentLoaded", function () {
    const usernameInput = document.getElementById("username-input");
    const searchButton = document.getElementById("search-button");
    const profileCard = document.getElementById("profile-card");

    searchButton.addEventListener("click", function () {
        const username = usernameInput.value;

        if (username) {
            fetch(`https://api.github.com/users/${username}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.message === "Not Found") {
                        alert("User not found!");
                    } else {
                        displayUserProfile(data);
                    }
                })
                .catch((error) => console.error(error));
        } else {
            alert("Please enter a GitHub username.");
        }
    });

    function displayUserProfile(user) {
        const profileCardHtml = 
        `
           <div> <img src="${user.avatar_url}" alt="${user.login}" id="prof-img" width="460" height="345"/></div>
            <h2>${user.name || user.login}</h2>
            <div class="bio"><p id="bio">${user.bio || "--No bio available--"}</p></div>
            <p>${user.public_repos} Repositories</p>
            <div class="followers"><p>${user.followers} Followers</p></div>
            <div class="following"><p>Following ${user.following}</p></div>
        `;
        // `
        // <div class="profile-card" id="profile-card">
        //     <div class="main-info">
        //         <img src="${user.avatar_url}" alt="${user.login}" id="prof-img" />
        //         <h2>${user.name || user.login}</h2>
        //     </div>
        //     <div class="bio">
        //     <p>${user.bio || "No bio available"}</p>
        //     <p>${user.public_repos} Repositories</p>
        //     </div>
        //     <div class="follow">
        //         <div class="followers">
        //         <p>${user.followers} Followers</p>
        //         </div>
        //     <div class="following">
        //     <p>Following ${user.following}</p>
        //     </div>
        //     </div>


        // </div>

        // `;

        profileCard.innerHTML = profileCardHtml;
        profileCard.style.display = "block";
    }
});
