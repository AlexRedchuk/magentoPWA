import React, { Children } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Autoplay, Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/core';
import { useStyle } from "@magento/venia-ui/lib/classify";
import defaultClasses from '@magento/pagebuilder/lib/ContentTypes/Slider/slider.css';
SwiperCore.use([ Autoplay, Keyboard, Mousewheel, Navigation, Pagination ]);
import './slider.css';

const MySwiper = (props) => {
    const { children, cssClasses = [], autoplay, autoplaySpeed, infinite, showArrows, showDots} = props;
    const classes = useStyle(defaultClasses, props.classes);
    const sliderSettings = {
        autoplay: autoplay ? { delay: autoplaySpeed } : false,
        loop: infinite,
        navigation: showArrows,
        pagination: showDots ? {clickable: true} : false
    };

    const jarallaxInstances = {};
    const dynamicStyles = {};

    Children.map(children, (child, index) => {
        if (child.props && child.props.data) {
            child.props.data.classes = {
                root: classes.bannerRoot,
                link: classes.bannerLink,
                wrapper: classes.bannerWrapper,
                posterOverlay: classes.bannerPosterOverlay
            };
            child.props.data.getParallax = (element, options) => {
                jarallaxInstances[index] = {
                    element,
                    options
                };
            };
        }
        return child;
    });

    return (
        <div className={[classes.root, ...cssClasses].join(' ')} style={dynamicStyles}>
            <Swiper {...sliderSettings}>
                {children.map((item, index) => (
                    <SwiperSlide key={index}>
                        {item}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default  MySwiper;
