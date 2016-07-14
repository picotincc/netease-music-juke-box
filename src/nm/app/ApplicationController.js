import NJUApplicationController from "../../nju/app/ApplicationController";

import Application from "./Application";
import ServiceClient from "../service/ServiceClient";

export default class ApplicationController extends NJUApplicationController
{
    init()
    {
        super.init();
        this._playLists = [];
        this._selectedPlayList = null;
    }

    get playLists()
    {
        return this._playLists;
    }
    set playLists(value)
    {
        this._playLists = value;
        this._onPlayListsChanged();
    }

    get selectedPlayList()
    {
        return this._selectedPlayList;
    }
    set selectedPlayList(value)
    {
        if (this.selectedPlayList !== value)
        {
            this._selectedPlayList = value;
            this._onSelectedPlayListChanged();
        }
    }

    createApplication()
    {
        const application = new Application();
        this.playListView = application.playListView;
        this.playListView.on("selectionchanged", this._playListView_selectionchanged.bind(this));
        this.trackTableView = application.trackTableView;
        return application;
    }

    async run()
    {
        console.log("Netease Music Webapp is now running...");

        try {
            await ServiceClient.getInstance().login();
            await this._loadUserPlayList();

        }
        catch (e)
        {
            console.log(e);
        }
    }


    async _loadUserPlayList()
    {
        this.playLists = await ServiceClient.getInstance().getUserPlayLists();

        if (this.playLists.length > 0)
        {
            this.playListView.selection = this.playLists[0];
        }
    }

    _onPlayListsChanged()
    {
        this.playListView.items = this.playLists;
    }

    _onSelectedPlayListChanged()
    {
        if (this.selectedPlayList !== null)
        {
            this.trackTableView.items = this.selectedPlayList.tracks;
        }
        else
        {
            this.trackTableView.items = [];
        }
    }

    async _playListView_selectionchanged(e)
    {
        const playList = await ServiceClient.getInstance().getPlayListDetail(this.playListView.selectedId);
        this.selectedPlayList = playList;
    }
}
