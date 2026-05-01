import glImg1 from "@/../public/image/gl-img-01.jpg";
import glImg2 from "@/../public/image/gl-img-02.jpg";
import glImg3 from "@/../public/image/gl-img-03.jpg";
import glImg4 from "@/../public/image/gl-img-04.jpg";
import glImg5 from "@/../public/image/gl-img-05.jpg";
import glImg6 from "@/../public/image/gl-img-06.jpg";
import Image from "next/image";
import BlurCircle from "../shared/blurCircle/BlurCircle";
import MainSectionTitle from "../shared/mainSectionTitle/MainSectionTitle";

const OurGallery = () => {
  return (
    <section className="p-top relative z-30 overflow-x-hidden">
      <BlurCircle top="100px" right="-200px" />
      <div className="container-fluid">
        <div className="relative">
          <MainSectionTitle
            subtitle="Visual Storie"
            title="Explore Movie Moments Captured In Cinemas"
            description="Explore cinematic moments, fan experiences, and the vibrant atmosphere of our theaters. Every image tells a story of entertainment, emotion, and excitement."
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-7.5">
          <div className=" space-y-7.5">
            <Image
              src={glImg1}
              alt="gallary image 1"
              className="w-full h-auto rounded-xl"
            />
            <Image
              src={glImg4}
              alt="gallary image 4"
              className="w-full h-auto rounded-xl"
            />
          </div>
          <div className="md:pt-20 space-y-7.5">
            <Image
              src={glImg2}
              alt="gallary image 2"
              className="w-full h-auto rounded-xl"
            />
            <Image
              src={glImg5}
              alt="gallary image 5"
              className="w-full h-auto rounded-xl"
            />
          </div>
          <div className="max-md:col-span-2 grid max-md:grid-cols-2 md:pt-40 space-y-7.5">
            <Image
              src={glImg3}
              alt="gallary image 3"
              className="w-full h-auto rounded-xl"
            />
            <Image
              src={glImg6}
              alt="gallary image 6"
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurGallery;
