import NJUApplication from "../../nju/app/Application";

import PlayListView from "../view/PlayListView";
import TrackTableView from "../view/TrackTableView";
import PlayerView from "../view/PlayerView";

import ServiceClient from "../service/ServiceClient";

export default class Application extends NJUApplication
{

    init()
    {
        super.init();
        this.addStyleClass("nm-app");
        this._initLayout();
        this._initPlayListView();
        this._initTrackTableView();
        this._initPlayerView();
    }

    _initLayout()
    {
        this.$element.append(`
            <header><h1>网易云音乐</h1></header>
            <main>
                <aside class="sidebar"></aside>
                <section class="content"></section>
            </main>
            <footer></footer>
        `);
    }

    _initPlayListView()
    {
        this.playListView = new PlayListView("play-list");
        this.addSubView(this.playListView, this.$("> main > aside.sidebar"));
    }

    _initTrackTableView()
    {
        this.trackTableView = new TrackTableView("track-table");
        this.addSubView(this.trackTableView, this.$("> main > section.content"));
    }

    _initPlayerView()
    {
        this.playerView = new PlayerView("player");
        this.addSubView(this.playerView, this.$("> footer"));
    }


    async run()
    {
        console.log("Netease Music Webapp is now running...");

        try {
            await ServiceClient.getInstance().login();
            this.playListView.items = await ServiceClient.getInstance().getUserPlayLists();

            const playlist = await ServiceClient.getInstance().getPlayListDetail(this.playListView.items[10].id);
            this.trackTableView.items = playlist.tracks;
            console.log(playlist.tracks);
        }
        catch (e)
        {
            console.log(e);
        }
        // ServiceClient.getInstance().login().then(() => {
        //     ServiceClient.getInstance().getUserPlayLists().then(playlists => {
        //         this.playListView.items = playlists;
        //     });
        // });
        // Pseudo login - User ID

        // Refresh
    }
}
