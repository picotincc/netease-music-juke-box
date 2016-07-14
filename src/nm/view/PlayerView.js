import View from "../../nju/view/View";

export default class PlayerView extends View
{
    init()
    {
        super.init();
        this._track = null;
        this.addStyleClass("nm-player-view");

        this._initLayout();
    }

    _initLayout()
    {

    }


    getElementTag()
    {
        return "span";
    }

    get track()
    {
        return this._track;
    }

    set track(value)
    {
        this._track = value;
    }

    renderTrack(track)
    {

    }
}
