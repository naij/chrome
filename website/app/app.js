KISSY.config({
    map:[
        [/(.+app\/.+)-min.js(\?[^?]+)?$/, "$1.js$2"]
    ],
    packages:[
        {
            name:"app",
            tag:"20131123",
            path:"./",
            charset:"utf-8"
        }
    ]
});

KISSY.ready(function(){
    KISSY.use('app/sitemap, switchable', function(S, SiteMap, Switchable){
        var $ = S.all;

        function Site(){
            this.renderUI();
        }

        S.augment(Site, {
            renderUI: function(){
                var navEl = $('.nav');
                var cntEl = $('.cnt');
                var navTpl = $('#J_nav_tpl').html();
                var cntTpl = $('#J_cnt_tpl').html();

                navEl.html(Mustache.render(navTpl, {siteMap: SiteMap}));
                cntEl.html(Mustache.render(cntTpl, {siteMap: SiteMap}));

                this.bindUI();
            },
            bindUI: function(){
                var tab = Switchable.Tabs('#J_tabs', {
                    navCls: 'nav',
                    contentCls: 'cnt',
                    triggerType : 'click',
                    activeTriggerCls: 'active'
                });

                tab.on('beforeSwitch', function(ev){
                    var panel = $(tab.panels[ev.toIndex]);
                    var img = panel.all('img');

                    img.each(function(item){
                        if (item.hasAttr('data-image')) {
                            item.attr('src', item.attr('data-image'));
                            item.removeAttr('data-image');
                        }
                    });
                });
            }
        });

        new Site();
    });
});