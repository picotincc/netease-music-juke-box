import NJUApplicationController from "../../nju/app/ApplicationController";

import Application from "./Application";
import ServiceClient from "../service/ServiceClient";

export default class ApplicationController extends NJUApplicationController
{
    createApplication()
    {
        const application = new Application();
        this.playListView = application.playListView;
        this.trackTableView = application.trackTableView;
        return application;
    }

    async run()
    {
        console.log("Netease Music Webapp is now running...");

        try {
            await ServiceClient.getInstance().login();
            this.playListView.items = await ServiceClient.getInstance().getUserPlayLists();
            this.playListView.selection = this.playListView.items[0];
            const playlist = await ServiceClient.getInstance().getPlayListDetail(this.playListView.items[10].id);
            this.trackTableView.items = playlist.tracks;
            console.log(playlist.tracks);
        }
        catch (e)
        {
            console.log(e);
        }
    }
}
