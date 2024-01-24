const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let sideBarOpen = false;

// Function to change info element when an event is clicked
function updateInfo(eventData, identifier) {
    // EventData is an array of JSONS. identifier is to identify which element was selected / which data should be showed.

    // Prepare variables.
    let event = eventData[identifier];
    let date = new Date(event.unix_timestamp * 1000);
    let eventBackground = document.getElementById('event-title');
    let eventTitle = document.getElementById('event-name');
    let eventDate = document.getElementById('event-date');
    let eventDescription = document.getElementById('event-description');

    let eventElements = document.getElementsByClassName('event');

    // Change event information

    eventBackground.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('" + event.image + "')";
    eventTitle.innerHTML = event.title;
    eventDate.innerHTML = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getHours() + ':' + date.getMinutes() + 0;
    eventDescription.innerHTML = event.description;

    // Remove all "Selected" classes, and apply it to last clicked.
    for (let i = 0; i < eventElements.length; i++ ) {
        if (i != identifier) {
            eventElements[i].classList.remove('selected');
        } else {
            eventElements[i].classList.add('selected');
        }
    }

}

// Send HTTP post request for events data
async function get_events() {
    try {
        // Get response from server
        const response = await fetch("/get_events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({}),
        })

        // Convert readable stream into json
        const data = await response.json();

        console.log(data);

        // Put data on the website
        data.forEach( (event, index) => {
            // Get required elements
            const eventsContainer = document.getElementById('event-list');
            let eventElements = document.getElementsByClassName('event');

            // Convert UNIX timestamp to date
            let date = new Date(event.unix_timestamp * 1000);
            // Create shorthand date
            let shortDate = months[date.getMonth()].substring(0, 3) + ' ' + date.getDate();

            if (index === 0) {
                // Fill the first list element, and description area.

                // List elements
                let listDate = eventElements[index].getElementsByClassName('event-list-date');
                let listName = eventElements[index].getElementsByClassName('event-list-name');

                // Info elements
                let eventBackground = document.getElementById('event-title');
                let eventName = document.getElementById('event-name');
                let eventDate = document.getElementById('event-date');
                let eventDescription = document.getElementById('event-description');

                // Put date & event title into the events list
                listDate[0].innerHTML = shortDate;
                listName[0].innerHTML = event.title;

                // Put data into event description. Because the first event starts selected,
                // We'll do that for our first event.

                // Set title background
                eventBackground.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('" + event.image + "')";

                // Set title
                eventName.innerHTML = event.title;

                // Set date
                // Will have to test this further, but I think this is the correct way to write down the date.
                eventDate.innerHTML = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getHours() + ':' + date.getMinutes() + 0;

                // Set description
                eventDescription.innerHTML = event.description;

                // Apply event listener

            } else {
                // Clone first event list item
                let clonedListItem = eventElements[0].cloneNode(true);

                // Remove "selected" class
                clonedListItem.classList.remove('selected');

                // Add item to list
                eventsContainer.appendChild(clonedListItem);

                // Get list elements
                let listDate = eventElements[index].getElementsByClassName('event-list-date');
                let listName = eventElements[index].getElementsByClassName('event-list-name');

                // Put date & event title into the events list
                listDate[0].innerHTML = shortDate;
                listName[0].innerHTML = event.title;
            }
        });

        // After the loop, apply event listeners
        let eventElements = document.getElementsByClassName('event');

        for (let i = 0; i < eventElements.length; i++) {
            eventElements[i].addEventListener('click', () => {
                updateInfo(data, i);
            });
        }


    } catch (err) {
        console.log(err);
    };
};

// Get page height and apply it to the banner containers
// This has to be run every timee the page is resized unfortunately.
function bannerHeight() {
    const bannerContainerLeft = document.getElementById('banner-left');
    const bannerContainerRight = document.getElementById('banner-right');
    let pageHeight = document.body.scrollHeight;

    bannerContainerLeft.style.height = pageHeight + "px";
    bannerContainerRight.style.height = pageHeight + "px";
}

// Listen for pageresize 
window.addEventListener('resize', () => {
    bannerHeight();
})

// Reveal and hide sidebar
function sideBar() {
    console.log("hiya");
    const sideBar = document.getElementById('sidebar');

    // If sidebar is open, close it, and stop function
    if(sideBarOpen) {
        sideBar.style.right = "-110vw";
        sideBarOpen = false;
        return;
    }

    sideBar.style.right = "0";
    sideBarOpen = true;
}

// Apply to all sidebar buttons
let sideBarButtons = document.getElementsByClassName('sidebar-btn');

for (element of sideBarButtons) {
    element.addEventListener('click', () => {
        sideBar();
    })
}

// Run the bannerheight once on page load
bannerHeight();
// Get events on page load
get_events();