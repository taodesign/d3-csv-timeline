d3.csv("assets/data.csv", function(data) {

var tsectionData = d3.nest()
                     .key(function(d) {return d.sectionTitle;})
                     .entries(data);

var tlwrap = d3.select('.tlwrap')
              .selectAll(".tsection")
              .data(tsectionData)
              .enter()
              .append('div')
              .classed('tsection',true);

var tsectionLine = tlwrap.append('div')
              .classed('line',true);

var tsectionTitle = tlwrap.filter(function(d) {
                if(d.key){
                  return this
                }
              })
              .append('div')
              .classed('sectitle',true)
              .append('h2')
              .html(function(d) {return d.key});

var tsection = tlwrap.selectAll(".tnode")
              .data(function(d){return d.values;})
              .enter()
              .append('div')
              .classed('tnode',true)
              .classed('highlight',function(d){ //高亮节点
                return d.highlight
              })
              .classed('acrosscol',function(d){ //通栏节点
                return d.isAcrossCol
              })
              .each(function(d,index){
                console.log(d,index);
                var theNode = d3.select(this);

                theNode.classed(d.customStyle,true);
                //mediaNodeRender
                function mediaNodeRender (parentNode) {
                  //media img
                  if(d.nodeImg){
                      var mediaNode = parentNode.append('div')
                                          .classed('nodemedia',true)
                      var imgBody = mediaNode.append('img')
                                          .attr('src','media/'+d.nodeImg);
                      if(d.nodeImgInfo){
                        var mediaInfo = mediaNode.append('p')
                                  .classed('mediainfo',true)
                                  .text(d.nodeImgInfo)
                      }
                  }
                  //media Audio
                  if(d.nodeAudio){
                      var mediaNode = parentNode.append('div')
                                                .classed('nodemedia',true)
                      var audioBody = mediaNode.append('audio')
                                                .attr({
                                                  'controls':'controls',
                                                  'preload':'preload'
                                                })
                                                .append('source')
                                                .attr({
                                                  'src':'media/'+d.nodeAudio,
                                                  'type':'audio/mpeg'
                                                });
                      if(d.nodeAudioInfo){
                        var mediaInfo = mediaNode.append('p')
                                    .classed('mediainfo',true)
                                    .text(d.nodeImgInfo)
                      }
                  }
                  //media Video
                  if(d.nodeVideo){
                      var mediaNode = parentNode.append('div')
                                         .classed('nodemedia videowrap',true);
                      var videoBody = mediaNode.append('div')
                                          .classed('videobody',true)
                      var theVideo = videoBody.append('video')
                                          .attr({
                                            'controls':'controls',
                                            'preload':'auto',
                                            'poster':'media/'+d.nodeVideoCover
                                          })
                                          .append('source')
                                          .attr({
                                            'src':'media/'+d.nodeVideo,
                                            'type':'video/mp4'
                                          })
                      if(d.nodeVideoInfo){
                        var mediaInfo = mediaNode.append('p')
                                    .classed('mediainfo',true)
                                    .text(d.nodeVideoInfo)
                      }
                  }
                  //media iframe
                  if(d.nodeiframe){
                      var mediaNode = parentNode.append('div')
                                                .classed('nodemedia iframebox',true);
                      var iframebox = mediaNode.append('div')
                                                .classed('iframeinner',true);
                      var iframeBody = iframebox.append('iframe')
                                                .attr({
                                                  'frameborder':'0',
                                                  'width':'100%',
                                                  'height':'300',
                                                  'src':d.nodeiframe
                                                });
                      if(d.nodeiframeInfo){
                        var mediaInfo = mediaNode.append('p')
                                    .classed('mediainfo',true)
                                    .text(d.nodeiframeInfo)
                      }
                  }
                  //extra content
                  if(d.nodeExtLink){
                      var mediaNode = parentNode.append('div')
                                         .classed('nodemedia',true)
                                         .classed('extcon',true);
                      if(d.nodeExtImg){
                        var mediaBody = mediaNode.append('a')
                                  .attr('href',d.nodeExtLink)
                                  .attr('target','_blank')
                                  .append('img')
                                  .attr('src','media/'+d.nodeExtImg);
                      }
                      if(d.nodeExt){
                        var mediaInfo = mediaNode.append('p')
                                  .classed('mediainfo',true)
                                  .append('a')
                                  .attr('href',d.nodeExtLink)
                                  .attr('target','_blank')
                                  .text(d.nodeExt)
                      }
                  }
                }

                if (d.isAcrossCol) {
                    //cross node: only media
                    mediaNodeRender(theNode);
                }else{
                    //media & text node
                    var nodeTime = theNode.append('div')
                                          .classed('ntime',true)
                                          .text(d.nodeTime);
                    var nodeConWrap = theNode.append('div')
                                             .classed('nconwrap',true)
                    var nodeConTitle = nodeConWrap.append('h3')
                                                  .text(d.nodeTitle);

                    var nodeCon = nodeConWrap.append('div')
                                             .classed('nodecon',true)
                    if(d.nodeContent){
                        var nodeConeText = nodeCon.append('div')
                                                  .classed('nodetext',true)
                                                  .append('p')
                                                  .text(d.nodeContent);
                    }
                    //media
                    mediaNodeRender(nodeCon);

                }
              })
});