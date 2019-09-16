// const chromecastjs = require('chromecast-js');

// class Caster{
//     constructor(){
//         this.device =  null;
//         this.ready = false;
//     }

//     async connect_to_device(rest, caster, callback, resp){
//         var self = this;
//         console.log("Connecting to Cast ....");
//         var browser = new chromecastjs.Browser()
//         await browser.on('deviceOn', async function(device){
//             var dev = await device.connect();
//             callback(rest, caster, dev);
//             resp.json("connecting ...");
//         });
//     }

//     // set_device(dev){
//     //     this.device = dev.connect();
//     //     this.ready = true;
//     //     console.log(this.ready);
//     // }

//     cast(device, link){
//         console.log("Trying to Cast ....");
//         // if  (this.ready){
//         device.on('connected', function(){
//             device.play(link, 60, function(){
//                 console.log('Playing in chromecast!');
//             });
//         });
//         // }else{
//             // console.log("Cast Not Ready "+this.ready);
//         // }
//     }

//     pause(){
//         if  (this.ready){
//             this.device.pause(function(){
//                 console.log('Paused!')
//             });
//         }else{
//             console.log("Cast Not Ready");
//         }
//     }

//     play(){
//         if  (this.ready){
//             this.device.unpause(function(){
//                 console.log('unpaused!')
//             });
//         }else{
//             console.log("Cast Not Ready");
//         }
//     }

//     seek(duration){
//         if  (this.ready){
//             this.device.seek(duration,function(){
//                 console.log('seeking forward!')
//             });
//         }else{
//             console.log("Cast Not Ready");
//         }
//     }
// }

// module.exports = Caster