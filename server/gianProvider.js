const fs = require('fs');
const chromecastjs = require('chromecast-js');

class GianPlayProvider{
    constructor(){
        // this.media_folder = "./media_lib";
        this.last_files = [];
        this.dir_map = new Map();
        this.ID_map = new Map();
        this.id = 0;
        // this.update_content_ID_map(this.media_folder, "media_lib");
        // console.log(this.ID_map);
    }

    async callback_log(data){
        await console.log(data);
    }

    async return_Item(item){
        await console.log(item);
        return item;
    }

    // update_content_ID_map(path, name){
    //     try{
    //         var files = fs.readdirSync(path);
    //         this.id+=1;
    //         this.ID_map.set(this.id, [path,"r",name, files]);
    //         for (var index in files){
    //             this.update_content_ID_map(path+"/"+files[index], files[index]);
    //         }

    //     }catch(err){
    //         this.id+=1;
    //         this.ID_map.set(this.id, [path,"f", name]);
    //     }
    // }

    update_content_ID_map(path, name){
        var id = this.id+=1;
        var f_array = [id, name, []];
        try{
            var files = fs.readdirSync(path);
            for (var index in files){
               f_array[2].push(this.update_content_ID_map(path+"/"+files[index], files[index]));
            }
            
            this.ID_map.set(id, f_array);
            return [id, [path,"r", name]];
        }catch(err){
            // this.id+=1;
            // this.ID_map.set(this.id, [path,"f", name]);
            return [id, [path,"f", name]];
        }
    }

    get_content_id_map(){
        return this.ID_map;
    }

    update_dir_map_content(dir){
        try{
            var content = fs.readdirSync(dir);
            // console.log(content);
            if (!this.dir_map.has(dir)){
                this.dir_map.set(dir, content);
                return [this.dir_map, true];
            }else{
                return [this.dir_map, false];
            }
            
        }catch(err){
            // console.log(err);
            return [this.dir_map, false];
        }
        // console.log("map :"+this.dir_map.get(key)[1]);
        
    }

    stream_file (req, res, path) {
        // console.log("-------------------------------------------------- Requested")
        // var path = newkey;
        var stat = fs.statSync(path);
        var total = stat.size;
        if (req.headers['range']) {
            var range = req.headers.range;
            var parts = range.replace(/bytes=/, "").split("-");
            var partialstart = parts[0];
            var partialend = parts[1];
    
            var start = parseInt(partialstart, 10);
            var end = partialend ? parseInt(partialend, 10) : total - 1;
            var chunksize = (end - start) + 1;
            // console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);
    
            var file = fs.createReadStream(path, { start: start, end: end });
            res.writeHead(206, {
                'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4'
            });
            file.pipe(res);
        } else {
            // console.log('ALL: ' + total);
            res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
            fs.createReadStream(path).pipe(res);
        }
    }
}


module.exports = GianPlayProvider