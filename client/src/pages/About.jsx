const About = () => {

  const developers = [
    {
      name: "Katherine",
      pronouns: "(She/They)",
      description: "Hi! I'm Katherine, current artist and web developer and former attorney. I'm currently enjoying spending time building web applications and problem solving. I'm always excited to learn new solutions to interesting problems.",
      github: "https://github.com/katherinearenas", 
    },
    {
      name: "Cong",
      pronouns: "(She/Her)",
      description: "I'm Cong Wang, a researcher in education and psychology. I am currently transitioning my career to pursue opportunities in software engineering and website development. I am passionate about leveraging technology to solve complex problems and create positive change.",
      github: "https://github.com/hydy1943cong",
    },
    {
      name: "Anastasia",
      pronouns: "(She/Her)",
      description:
        "I'm Anastasia Kravtsov, a tech expert with over 15 years of experience in software Quality Assurance and Engineering. Currently, I'm further enhancing my skills through a coding bootcamp. I have a deep passion for continuous learning and growth in the tech industry.",
      github: "https://github.com/akravt1274",
    },
  ];

  return (
    <div className="container text-center my-5">
      <h1 className="mb-4">Meet the Developers</h1>
      <div className="row justify-content-center">
        {developers.map((dev, index) => (
          <div key={index} className="col-md-4">
            <div className="card mb-4 shadow-sm">
              {/* <img src={dev.image} alt={`${dev.name}'s profile`} className="card-img-top rounded-circle mx-auto mt-3" style={{ width: '150px', height: '150px' }} /> */}
              <div className="card-body">
                <h5 className="card-title">
                  {dev.name} {dev.pronouns}
                </h5>
                <p className="card-text">{dev.description}</p>
                <div>
                  <a href={dev.github}>{dev.name}'s Github</a>
                </div>
                <h5 className="card-title">{dev.name} {dev.pronouns}</h5>
                <p className="card-text">{dev.description}</p>
                <div><a href={dev.github}>{dev.name}'s Github</a></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default About;
