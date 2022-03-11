import Image from "next/image";
import React, { useState, useCallback, useEffect } from 'react';
import { render } from 'react-dom';
import ImageViewer from 'react-simple-image-viewer';
import { motion, useAnimation } from "framer-motion"

const animationVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

export default function Gallery(props) {

    const [loaded, setLoaded] = useState(false);
    const animationControls = useAnimation();
    useEffect(
        () => {
            if(loaded){
                animationControls.start("visible");
            }
        },
        [loaded]
    );

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = [
    'https://www.thespruce.com/thmb/QMLd3NztY1xfXNewxIMTvzhQi0k=/434x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/how-to-clean-your-shoes-4164257-03-9b296afe3198437fa348080e1775e96f.jpg',
    'https://www.thespruce.com/thmb/dDC9DbCYxRPahDINR6sCieTOn64=/434x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/how-to-clean-your-shoes-4164257-08-db24e0171cca4cb4aee715354b9d732a.jpg',
    'https://www.thespruce.com/thmb/MGAxZOIUREieHqVGeU6Mjccd6wQ=/434x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/how-to-clean-your-shoes-4164257-09-bfdcc9900e2343c1b3a3f28e6fc09700.jpg',
    'https://assets.pikiran-rakyat.com/crop/0x0:0x0/703x385/photo/2020/08/17/238036375.jpg',
    'https://i.pinimg.com/originals/1e/74/62/1e74623145cf1b336c945a3004fb4820.jpg',
    'https://pingpoint.co.id/media/images/6_LACuPjt.original.jpg',
    'https://www.thespruce.com/thmb/Oqqqd7rwlmpiRUqs3mIT6Wolp9c=/941x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/how-to-clean-white-shoes-4769230-15-1c609baf1fbc4ca191832c9f6bbde68d.jpg',
    'https://www.thespruce.com/thmb/DQ7QyNnWztCeB8yw-Bk6h7m-ze0=/700x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/how-to-clean-white-shoes-4769230-05-e7e4d192eb654bb2bdc65f29e6415489.jpg',
    'https://www.thespruce.com/thmb/h7m9bKVk5G3B3hxR29rSQUJZ374=/700x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/how-to-clean-white-shoes-4769230-06-92eff3d2f4c848d39888fc476f861559.jpg',
  ];

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  

  return (
    <div>
        <h1 className="font-bold text-black text-[36px] lg:text-[48px] text-center mb-8">Gallery</h1>
        <div className="flex flex-row flex-wrap justify-center mb-[10px]">
        {images.map((src, index) => (
          <div key={index} className="relative w-[200px] h-[130px] lg:w-[350px] lg:h-[200px] m-1">
          <motion.div
            initial={"hidden"}
            animate={animationControls}
            variants={animationVariants}
            transition={{ ease: "easeOut", duration: 1 }}
        >
            <Image
              src={ src }
              onClick={ () => openImageViewer(index) }
              onLoad={() => setLoaded(true)}
              layout="fill"
              key={ index }
              className='m-1 grayscale hover:grayscale-0'
              objectFit="cover"
              alt=""
            />
            </motion.div>
          </div>
      ))}

      {isViewerOpen && (
        <ImageViewer
          src={ images }
          currentIndex={ currentImage }
          disableScroll={ false }
          closeOnClickOutside={ true }
          onClose={ closeImageViewer }
        />
      )}
        </div>
    </div>
  )
}

/* 
<div className="relative w-[400px] h-[189px] mr-2">
            <Image src={g1} alt="g1" layout="fill" />
          </div>
          <div className="relative w-[234px] h-[189px] mr-2">
            <Image src={g2} alt="g2" layout="fill" />
          </div>
          <div className="relative w-[234px] h-[189px]">
            <Image src={g3} alt="g3" layout="fill" />
          </div>
        </div>

        <div className="flex justify-center mb-[10px]">
        <div className="relative w-[234px] h-[189px] mr-2">
            <Image src={g4} alt="g4" layout="fill" />
          </div>
          <div className="relative w-[400px] h-[189px] mr-2">
            <Image src={g5} alt="g5" layout="fill" />
          </div>
          <div className="relative w-[234px] h-[189px]">
            <Image src={g6} alt="g6" layout="fill" />
          </div>
        </div>

        <div className="flex justify-center">
        <div className="relative w-[234px] h-[189px] mr-2">
            <Image src={g7} alt="g7" layout="fill" />
          </div>
          <div className="relative w-[234px] h-[189px] mr-2">
            <Image src={g8} alt="g8" layout="fill" />
          </div>
          <div className="relative w-[400px] h-[189px]">
            <Image src={g9} alt="g9" layout="fill" />
          </div>
*/