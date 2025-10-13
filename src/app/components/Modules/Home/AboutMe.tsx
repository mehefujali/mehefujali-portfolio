import Image from "next/image";


const AboutMe = () => {
    const starCount = 1000
    return (
        <div className=" w-full overflow-hidden relative -z-50" id="about">
            <div className=" w-[100vw] h-[150vh] blur-3xl -translate-y-1/2 absolute  rounded-full bg-gradient-to-b from-white via-white/20 to-transparent ">

            </div>
            <div className="absolute z-50">
                {Array.from({ length: starCount }).map((_, i) => (
                    <span key={i} className=" h-10 w-10 bg-white"></span>
                ))}
            </div>
            <div className="py-12 container mx-auto z-30 relative " style={{

            }}>

                <h1 className="relative my-6 z-10 text-2xl text-center  md:text-3xl  bg-clip-text  font-sans font-bold">
                    About Me
                </h1>
                <div className=" flex flex-col md:flex-row items-center w-11/12 md:w-fit mx-auto gap-6  ">
                    <Image src="/about-me.png" alt="Mehefuj Ali" height={300} width={300} />
                    <div className=" max-w-lg space-y-2 text-justify ">
                        <h1 className=" text-3xl md:text-5xl">Hello! I&apos;m Mehefuj Ali,</h1>
                        <p> a passionate Full-Stack Developer from West Bengal, India. My expertise lies in building modern, scalable, and responsive web applications from scratch. I am proficient in the entire MERN stack (MongoDB, Express.js, React.js, Node.js) and enjoy turning complex problems into clean, efficient, and elegant code</p>
                        <p>I thrive on challenges and am always eager to learn new technologies to enhance my skills. My goal is to create seamless digital experiences that are not only functional but also provide an exceptional user experience. Let&apos;s connect and build something amazing together!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;