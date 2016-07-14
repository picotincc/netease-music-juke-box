import View from "../../nju/view/View";

export default class PlayerView extends View
{
    init()
    {
        super.init();
        this._track = null;
        this.$track = null;
        this.addStyleClass("nm-player-view");

        this._initLayout();
    }

    _initLayout()
    {
        this.$track = $(`<${this.getTrackElementTag()}/>`);
        this.renderTrack(this.track, this.$track);
        this.$container.append(this.$track);
    }


    getElementTag()
    {
        return "span";
    }

    getTrackElementTag()
    {
        return "div";
    }

    get track()
    {
        return this._track;
    }

    set track(value)
    {
        this.selectTrack(value);
    }

    selectTrack(track)
    {
        if(this.track === track) return;

        this._track = track;

        if (track)
        {
            this.renderTrack(track, this.$track);
        }
    }

    renderTrack(track, $track)
    {
        if (track !== null)
        {
            $track.text(track.name);
        }
        else
        {
            $track.text("none track");
        }
    }

}
