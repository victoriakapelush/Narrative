console.log(
    'This script populates posts to the database.'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Post = require("./models/Post");
  
  const posts = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createPosts();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  async function postCreate(index, title, description, image, text, tag) {
    const post = new Post({ title: title, description: description, image: image, text: text, tag: tag });
    await post.save();
    posts[index] = post;
    console.log(`Added post: ${title}`);
  }
  
  async function createPosts() {
    console.log("Adding posts");
    const imagePathPrefix = "./images/";
    await Promise.all([
      postCreate(
        0, 
        "The history of web design", 
        "Navigating the realm of web design entails more than creative flair, involving constant adaptation, collaboration, and an understanding of both aesthetic and functional aspects to truly excel in the field.",
        `${imagePathPrefix}web-designer.jpg`,
        "The history of web design is a fascinating journey that traces the evolution of the digital landscape from its inception to the complex and dynamic field it is today. In the early 1990s, the World Wide Web emerged, and the first websites were basic, text-heavy pages with minimal graphics. The advent of HTML in 1995 allowed for more structured and visually appealing layouts. As the internet gained popularity, the late 1990s witnessed the rise of Flash, enabling more interactive and multimedia-rich websites. The early 2000s brought about the era of CSS, separating content from presentation and providing greater design flexibility. The mid-2000s saw the emergence of responsive design to accommodate the diverse array of devices accessing the internet. With the 2010s came the dominance of mobile-first design, focusing on optimal experiences for smartphones and tablets. Today, web design continues to evolve with trends like minimalism, user-centric design, and the integration of emerging technologies, reflecting an ongoing narrative of innovation and adaptability in the ever-changing digital landscape.",
        "Culture"
        ),
      postCreate(
        1, 
        "The worst advice we've ever heard about web design", 
        "Propagating the misconception that web design is solely about aesthetics, disregarding the importance of functionality, user experience, and the dynamic nature of the digital landscape.",
        `${imagePathPrefix}web-things.jpg`,
        "The worst advice circulating in the realm of web design often revolves around misguided priorities and a skewed understanding of the user experience. One prevalent misconception is the insistence on prioritizing extravagant visuals at the expense of website functionality. This advice leads designers down a path of incorporating unnecessary animations, intricate designs, and superfluous features, resulting in slow-loading sites that frustrate users rather than engaging them. Another detrimental piece of counsel encourages designers to blindly follow the latest design trends, disregarding the long-term viability and relevance of these trends. This approach risks creating websites that quickly become outdated and fail to provide enduring value to users.Perhaps the most damaging advice pertains to neglecting accessibility considerations in pursuit of a visually striking design. Ignoring the needs of users with disabilities not only goes against ethical design principles but also limits the potential audience and inclusivity of a website. Effective web design should always prioritize a harmonious blend of aesthetics and functionality, with a keen awareness of the diverse needs of users and a commitment to delivering a seamless, accessible, and enduring user experience.",
        "Culture"
        ),
      postCreate(
        2, 
        "10 things nobody told you about being a web designer", 
        "Embarking on a web design journey involves more than creativity, encompassing continual learning, adaptability, collaboration, and an understanding of both aesthetic and functional aspects for a successful career.",
        `${imagePathPrefix}web-tools.jpg`,
        "Being a web designer involves more than just crafting visually appealing interfaces; it's a dynamic and multifaceted role that extends beyond pixels and colors. Firstly, effective communication is paramount, as clients often have diverse expectations and understanding their needs requires clarity and empathy. Secondly, staying current with evolving design trends and technologies is essential to provide cutting-edge solutions. Thirdly, time management becomes a critical skill, balancing creativity with meeting project deadlines. Collaboration with developers is often underestimated, emphasizing the importance of understanding coding principles for seamless teamwork. Iterative design is inevitable, requiring adaptability and a willingness to refine concepts based on feedback. Additionally, navigating the delicate balance between client preferences and optimal user experiences demands diplomacy and negotiation skills. Web design is not only about aesthetics but also about creating intuitive and accessible interfaces that cater to diverse user needs. Staying resilient in the face of criticism and continuously honing one's skills are indispensable for long-term success in this dynamic field. Lastly, the importance of creating a robust online presence for oneself cannot be overstated, as personal branding plays a pivotal role in attracting clients and opportunities.",
        "People"
        ),
        postCreate(
          3, 
          "7 must have tools for web designers", 
          "Web designers commonly use tools like Sketch, Figma, InVision, Visual Studio Code, Chrome DevTools, Canva, and GIMP for various design and development tasks.",
          `${imagePathPrefix}web-des.jpg`,
          "In the dynamic world of web design, seven indispensable tools stand out for their diverse functionalities. Sketch provides an intuitive platform for vector design, while Figma facilitates collaborative prototyping and design system management. InVision streamlines the design-to-development workflow with interactive prototypes and feedback mechanisms. Visual Studio Code, a lightweight yet robust code editor, caters to the coding aspect of web development. Chrome DevTools, an integral part of the Google Chrome browser, aids developers in debugging and optimizing web applications. Canva offers versatile and accessible graphic design resources, and GIMP provides a free and open-source alternative for image editing. Together, these tools empower web designers with a comprehensive arsenal for creating, refining, and optimizing web experiences.",
          "Technology"
          ),
          postCreate(
            4, 
            "7 ways to improve website usability and accessibility", 
            "Improving website usability and accessibility involves implementing a responsive design, clear navigation structures, and adhering to accessibility standards such as WCAG, ensuring an inclusive and user-friendly experience for all individuals, regardless of device or ability.",
            `${imagePathPrefix}web-usa.jpg`,
            "Enhancing website usability and accessibility is crucial for providing an inclusive and seamless online experience. Firstly, prioritize a responsive design that ensures your website is accessible on various devices, accommodating users with different screen sizes and resolutions. Implement clear navigation structures with intuitive menus and labels, making it easy for users to find information efficiently. Additionally, optimize page loading times by compressing images and minimizing unnecessary elements, ensuring a swift and frustration-free experience for all users. Secondly, make your content accessible to individuals with disabilities by adhering to web accessibility standards, such as the Web Content Accessibility Guidelines (WCAG). This involves providing alternative text for images, ensuring proper heading structures, and offering keyboard navigation options. Incorporate descriptive link text and avoid relying solely on color to convey information. Consider users with various abilities by offering adjustable font sizes and contrast options. Regularly conduct usability testing with individuals of diverse backgrounds and abilities to identify and address potential barriers, ensuring a more inclusive and user-friendly website.",
            "Technology"
            ),
            postCreate(
              5, 
              "10 quick tips about blogging", 
              "Successful blogging involves defining a niche, consistently creating valuable content, optimizing for SEO, maintaining a user-friendly design, engaging on social media, fostering community interaction, optimizing for mobile, capturing email subscribers, and monitoring analytics for informed decision-making.",
              `${imagePathPrefix}blog.jpg`,
              "Blogging is a powerful tool for self-expression, content creation, and building an online presence. Here are ten quick tips to enhance your blogging experience. Firstly, identify your target audience and tailor your content to meet their interests and needs. Understanding your audience helps in creating engaging and relevant posts that resonate with your readers. Secondly, consistency is key in the blogging world. Develop a regular posting schedule to keep your audience engaged and informed. Whether it's daily, weekly, or bi-weekly, maintaining a consistent presence establishes trust with your readers and helps build a loyal following over time. Thirdly, optimize your blog for search engines by incorporating relevant keywords naturally into your content. This boosts your blog's visibility and attracts organic traffic. Additionally, leverage social media platforms to share your blog posts, engage with your audience, and broaden your reach. Building a strong social media presence can significantly enhance the discoverability and popularity of your blog. Remember, blogging is not just about creating content; it's about creating a community around your ideas, and these tips can help you achieve just that.",
              "Lifestyle"
              ),
              postCreate(
                6, 
                "Designers who changed the web", 
                "Visionaries like Tim Berners-Lee, Jeffrey Zeldman, and Steve Jobs have transformed the web by inventing it, advocating for standards, and revolutionizing user interfaces, respectively, leaving a lasting impact on digital design and user experience.",
                `${imagePathPrefix}design.jpg`,
                "The evolution of the web has been significantly influenced by visionary designers who revolutionized the way we interact with online content. One such pioneer is Tim Berners-Lee, credited with inventing the World Wide Web. As the creator of the first web browser and editor, Berners-Lee laid the foundation for the interconnected digital landscape we navigate today. His vision of an open, collaborative platform has transformed the web into a space for sharing information, fostering innovation, and connecting people globally. Another influential figure is Jeffrey Zeldman, a web design expert and advocate for web standards. Zeldman co-founded the Web Standards Project, promoting the importance of adhering to established coding standards to improve accessibility and ensure consistency across different browsers. His advocacy for responsive web design, which adapts to various devices and screen sizes, has become a standard practice, enhancing the user experience and making the web more inclusive. In the realm of user interface and experience design, Steve Jobs has left an indelible mark. His vision for intuitive and aesthetically pleasing design shaped Apple's products, setting a new standard for user-friendly interfaces. The introduction of the iPhone and its touch-based interface revolutionized mobile interactions, influencing web design trends and emphasizing the importance of seamless, visually appealing experiences. Designers like Berners-Lee, Zeldman, and Jobs have not only changed the web but have also set the stage for ongoing innovations in the dynamic field of digital design.",
                "People"
                ),
                postCreate(
                  7, 
                  "7 things about web design your boss wants to know", 
                  "For a successful web design project, your boss should prioritize responsive design for cross-device compatibility, emphasize intuitive user experience, and understand the importance of integrating SEO best practices to enhance online visibility and user satisfaction.",
                  `${imagePathPrefix}boss.jpg`,
                  "In the fast-paced world of web design, there are several key aspects that your boss may want to know to ensure the success of a web project. Firstly, the importance of a responsive design cannot be overstated. A responsive website adapts seamlessly to various devices, providing an optimal user experience regardless of whether users access the site on a desktop, tablet, or smartphone. This not only enhances user satisfaction but also positively influences search engine rankings, making it a critical consideration for any modern web design project. Secondly, the significance of user experience (UX) design is crucial. Your boss would want to know that the website is not just visually appealing but also intuitive and easy to navigate. A well-thought-out UX design involves understanding the target audience, creating clear user journeys, and incorporating user feedback to refine the interface continually. A positive user experience is directly tied to customer satisfaction, conversion rates, and the overall success of the website. Thirdly, your boss may be interested in the importance of incorporating search engine optimization (SEO) best practices in the web design process. Effective SEO strategies involve optimizing on-page elements, ensuring a logical site structure, and creating quality content that aligns with relevant keywords. A website that is SEO-friendly not only attracts more organic traffic but also improves the visibility and ranking of the site on search engine results pages, contributing to the overall success of the business online.",
                  "Technology"
                  ),
    ]);
  }