import Application from "./app/Application";
import ServiceClient from "./service/ServiceClient";

function main() {
    ServiceClient.getInstance().getUserPlayLists().then(playlists =>{
        console.log(playlists);
        ServiceClient.getInstance().getPlayListDetail(playlists[0].id).then(list => {
            console.log(list);
        });
    });
    const app = new Application("app");
    app.placeAt(document.body);
    app.run();
}

$(main);
