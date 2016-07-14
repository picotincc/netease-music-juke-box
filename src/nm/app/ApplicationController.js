import NJUApplicationController from "../../nju/app/ApplicationController";

import Application from "./Application";
import ServiceClient from "../service/ServiceClient";

export default class ApplicationController extends NJUApplicationController
{
    init()
    {
        super.init();
        this._playLists = [];
        this._activePlayList = null;
        this._activeTrack = null;
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

    get activePlayList()
    {
        return this._activePlayList;
    }
    set activePlayList(value)
    {
        if (this.activePlayList !== value)
        {
            this._activePlayList = value;
            this._onActivePlayListChanged();
        }
    }

    get activeTrack()
    {
        return this._activeTrack;
    }

    set activeTrack(value)
    {
        if (this._activeTrack !== value)
        {
            this._activeTrack = value;
            this._onActiveTrackChanged();
        }
    }

    createApplication()
    {
        const application = new Application();
        this.playListView = application.playListView;
        this.playListView.on("selectionchanged", this._playListView_selectionchanged.bind(this));
        this.trackTableView = application.trackTableView;
        this.trackTableView.on("itemdblclick", this._trackTableView_itemdblclick.bind(this));
        this.playerView = application.playerView;
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

    _onActivePlayListChanged()
    {
        if (this.activePlayList !== null)
        {
            this.trackTableView.items = this.activePlayList.tracks;
        }
        else
        {
            this.trackTableView.items = [];
        }
    }

    _onActiveTrackChanged()
    {
        if (this.activeTrack !== null)
        {
            this.playerView.track = this.activeTrack;
        }
        else
        {
            this.playerView.track = null;
        }
    }

    async _playListView_selectionchanged(e)
    {
        const playList = await ServiceClient.getInstance().getPlayListDetail(this.playListView.selectedId);
        this.activePlayList = playList;
    }

    _trackTableView_itemdblclick(e)
    {
        const track = this.trackTableView.selection;
        this.activeTrack = track;
    }
}
