const NM_API_URL = "/api";

export default class ServiceClient
{
    constructor()
    {
        this._userId = null;
    }

    get userId()
    {
        return this._userId;
    }

    async login()
    {
        await this.__pseudoLogin();
    }

    async __pseudoLogin()
    {
        this._userId = "78843035";
    }

    async getUserPlayLists(uid = this.userId)
    {
        let res = null;
        try {
            res = await $.ajax({
                url: `${NM_API_URL}/user/playlist/`,
                data: {
                    uid,
                    limit: 1000,
                    offset: 0
                }
            });
        }
        catch (e)
        {
            throw e;
        }

        if (res.code === 200)
        {
            return res.playlist;
        }
        else
        {
            throw new Error("Response with error code:" + res.code);
        }
    }

    async getPlayListDetail(id)
    {
        let res = null;
        try {
            res = await $.ajax({
                url: `${NM_API_URL}/playlist/detail`,
                data: {
                    id
                }
            });
        }
        catch (e)
        {
            throw e;
        }

        if (res.code === 200 )
        {
            return res.result;
        }
        else
        {
            throw new Error("Response with error code:" + res.code);
        }
    }
}


let __instance = null;
ServiceClient.getInstance = function()
{
    if(__instance === null)
    {
        __instance = new ServiceClient();
    }
    return __instance;
}
