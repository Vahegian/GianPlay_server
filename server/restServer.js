const fs = require('fs');
class GianServer{
    constructor(server, GianProvider){
        this.media_folder = "media_lib";
        this.server = server;
        this.gp = GianProvider;  
        this.apiLink = "/LIO/";
        // this.cast_apiLink = "/cast/";
        this.dir_map = null;  
           
    }

    start_server(express){
        this.server.listen(7646, () => console.log("server running"));
        this.server.use(express.static('UI'));
        this.server.use(express.json({ limit: '1mb' }));
        this.gp.update_content_ID_map(this.media_folder, "media_lib");
        // console.log(this.ID_map);

        this.update_api_links();
    }

    stream_link(link, path){
        // this.dir_map = this.gp.update_dir_map_content(this.media_folder, "media_lib")[0]
        // var path = "server/media_lib/videos/s2e2.mp4"
        this.server.get(this.apiLink+link, (req, resp)=>{
            this.gp.stream_file(req,resp, path)
        });
        // this.update_api_links()     
    }

    return_content(link, content){
        this.server.get(this.apiLink+link, async(req, resp)=>{
            resp.json(content);
            // this.update_api_links(path);
        });
    }

    update_api_links(){
        var self = this;
        var new_map = this.gp.get_content_id_map();
        console.log(new_map);
        new_map.forEach(function(value, key){
            self.return_content(key, value);
            for (var i in value[2]){
                var item = value[2][i][1][1]; // type of file
                if(item=="f"){
                    self.stream_link(value[2][i][0], value[2][i][1][0]);
                }   
            }
        });
    }

    // open_cast_server_links(caster){
    //     this.server.get(this.cast_apiLink+"0", async(req, resp)=>{
    //         caster.connect_to_device(this, caster, this.build_cast_links, resp);
    //         // resp.json("connecting...");
    //         // this.update_api_links(path);
    //     });

        
    // }

    // build_cast_links(rest, caster, device){
    //     rest.server.post(rest.cast_apiLink+"1", async(req, resp)=>{
    //         console.log(req.body.body);
    //         caster.cast(device, req.body);
    //         resp.json("casting...");
    //         // this.update_api_links(path);
    //     });

    //     rest.server.get(rest.cast_apiLink+"2", async(req, resp)=>{
    //         caster.pause();
    //         resp.json("pausing...");
    //         // this.update_api_links(path);
    //     });

    //     rest.server.get(rest.cast_apiLink+"3", async(req, resp)=>{
    //         caster.play();
    //         resp.json("resuming...");
    //         // this.update_api_links(path);
    //     });

    //     rest.server.post(rest.cast_apiLink+"1", async(req, resp)=>{
    //         caster.seek(req.body);
    //         resp.json("casting...");
    //         // this.update_api_links(path);
    //     });

    //     console.log("Cast Server is Ready!");
    // }
}



module.exports = GianServer
