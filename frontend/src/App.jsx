import { useEffect, useState } from "react";
import {
  getAbout,
  getSkills,
  getProjects,
  getExperience,
  getServices,
  getTestimonials,
  getBlogs,
  sendContactMessage,
} from "./lib/api";

function App() {
  const [about, setAbout] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    msg: "",
  });

  const [contactStatus, setContactStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    getAbout()
      .then((data) => setAbout(data))
      .catch((error) => console.error("Error loading About:", error));

    getSkills()
      .then((data) => setSkills(data))
      .catch((error) => console.error("Error loading Skills:", error));

    getProjects()
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error loading Projects:", error));

    getExperience()
      .then((data) => setExperience(data))
      .catch((error) =>
        console.error("Error loading Experience:", error)
      );

    getServices()
      .then((data) => setServices(data))
      .catch((error) =>
        console.error("Error loading Services:", error)
      );

    getTestimonials()
      .then((data) => setTestimonials(data))
      .catch((error) =>
        console.error("Error loading Testimonials:", error)
      );

    getBlogs()
      .then((data) => setBlogs(data))
      .catch((error) =>
        console.error("Error loading Blogs:", error)
      );
  }, []);

  function handleContactChange(event) {
    const { name, value } = event.target;

    setContactForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleContactSubmit(event) {
    event.preventDefault();

    setContactStatus("");
    setIsSending(true);

    try {
      await sendContactMessage(contactForm);

      setContactStatus(
        "Your message has been sent successfully!"
      );

      setContactForm({
        name: "",
        email: "",
        subject: "",
        msg: "",
      });
    } catch (error) {
      console.error("Error sending contact message:", error);

      setContactStatus(
        "Failed to send your message. Please try again."
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          <h1 className="text-2xl font-bold text-cyan-400">
            Sandhya Veldhi
          </h1>

          <div className="hidden gap-6 md:flex">
            <a href="#home" className="hover:text-cyan-400">
              Home
            </a>

            <a href="#about" className="hover:text-cyan-400">
              About
            </a>

            <a href="#skills" className="hover:text-cyan-400">
              Skills
            </a>

            <a href="#experience" className="hover:text-cyan-400">
              Experience
            </a>

            <a href="#services" className="hover:text-cyan-400">
              Services
            </a>

            <a href="#projects" className="hover:text-cyan-400">
              Projects
            </a>

            <a href="#testimonials" className="hover:text-cyan-400">
              Testimonials
            </a>

            <a href="#blogs" className="hover:text-cyan-400">
              Blogs
            </a>

            <a href="#contact" className="hover:text-cyan-400">
              Contact
            </a>
          </div>

        </div>
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="flex min-h-screen items-center justify-center px-6 pt-20"
      >
        <div className="mx-auto max-w-4xl text-center">

          <p className="mb-4 text-lg text-cyan-400">
            Hello, I'm
          </p>

          <h2 className="text-5xl font-bold leading-tight md:text-7xl">
            Sandhya Veldhi
          </h2>

          <p className="mt-6 text-xl text-slate-300 md:text-2xl">
            Computer Science Engineering Student & Software Developer
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-slate-400">
            I build practical software applications using Python,
            FastAPI, React, databases, and modern web technologies.
          </p>

          <div className="mt-8 flex justify-center gap-4">

            <a
              href="#projects"
              className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="rounded-lg border border-cyan-400 px-6 py-3 font-semibold text-cyan-400 hover:bg-cyan-400 hover:text-slate-950"
            >
              Contact Me
            </a>

          </div>

        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-24">

        <div className="mx-auto max-w-5xl">

          <h2 className="text-4xl font-bold text-cyan-400">
            About Me
          </h2>

          <h3 className="mt-6 text-2xl font-semibold">
            {about ? about.title : "Loading..."}
          </h3>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
            {about
              ? about.description
              : "Loading About information..."}
          </p>

        </div>

      </section>

      {/* Skills */}
      <section
        id="skills"
        className="bg-slate-900 px-6 py-24"
      >

        <div className="mx-auto max-w-5xl">

          <h2 className="text-4xl font-bold text-cyan-400">
            Skills
          </h2>

          <div className="mt-8 flex flex-wrap gap-4">

            {skills.length > 0 ? (
              skills.map((skill) => (
                <span
                  key={skill.id}
                  className="rounded-full border border-cyan-400/40 bg-slate-800 px-5 py-3 text-slate-200"
                >
                  {skill.name}
                </span>
              ))
            ) : (
              <p className="text-slate-400">
                Loading skills...
              </p>
            )}

          </div>

        </div>

      </section>

      {/* Experience */}
      <section
        id="experience"
        className="px-6 py-24"
      >

        <div className="mx-auto max-w-5xl">

          <h2 className="text-4xl font-bold text-cyan-400">
            Experience
          </h2>

          {experience.length > 0 ? (
            <div className="mt-10 space-y-6">

              {experience.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-white/10 bg-slate-900 p-6"
                >

                  <div className="flex flex-col justify-between gap-2 md:flex-row">

                    <div>

                      <h3 className="text-2xl font-semibold">
                        {item.role}
                      </h3>

                      <p className="mt-1 text-lg text-cyan-400">
                        {item.company}
                      </p>

                    </div>

                    <p className="text-sm text-slate-400">
                      {item.start_date} — {item.end_date}
                    </p>

                  </div>

                  <p className="mt-5 leading-7 text-slate-300">
                    {item.description}
                  </p>

                </div>
              ))}

            </div>
          ) : (
            <p className="mt-8 text-slate-400">
              Loading experience...
            </p>
          )}

        </div>

      </section>

      {/* Services */}
      <section
        id="services"
        className="bg-slate-900 px-6 py-24"
      >

        <div className="mx-auto max-w-6xl">

          <h2 className="text-4xl font-bold text-cyan-400">
            Services
          </h2>

          {services.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2">

              {services.map((service) => (
                <div
                  key={service.id}
                  className="rounded-xl border border-white/10 bg-slate-950 p-6 transition hover:-translate-y-1 hover:border-cyan-400/50"
                >

                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 text-2xl text-cyan-400">
                    ⚡
                  </div>

                  <h3 className="text-2xl font-semibold">
                    {service.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-400">
                    {service.description}
                  </p>

                </div>
              ))}

            </div>
          ) : (
            <p className="mt-8 text-slate-400">
              Loading services...
            </p>
          )}

        </div>

      </section>

      {/* Projects */}
      <section id="projects" className="px-6 py-24">

        <div className="mx-auto max-w-6xl">

          <h2 className="text-4xl font-bold text-cyan-400">
            Projects
          </h2>

          {projects.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2">

              {projects.map((project) => (
                <div
                  key={project.id}
                  className="overflow-hidden rounded-xl border border-white/10 bg-slate-900 transition hover:-translate-y-1 hover:border-cyan-400/50"
                >

                  {project.image &&
                    project.image !== "string" && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-48 w-full object-cover"
                      />
                    )}

                  <div className="p-6">

                    <h3 className="text-2xl font-semibold">
                      {project.title}
                    </h3>

                    {project.description && (
                      <p className="mt-4 leading-7 text-slate-400">
                        {project.description}
                      </p>
                    )}

                    {project.technologies && (
                      <div className="mt-5 flex flex-wrap gap-2">

                        {project.technologies
                          .split(",")
                          .map((technology, index) => (
                            <span
                              key={index}
                              className="rounded-full bg-slate-800 px-3 py-1 text-sm text-cyan-300"
                            >
                              {technology.trim()}
                            </span>
                          ))}

                      </div>
                    )}

                    <div className="mt-6 flex gap-4">

                      {project.github_url &&
                        project.github_url !== "string" && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border border-cyan-400 px-4 py-2 text-sm font-semibold text-cyan-400 hover:bg-cyan-400 hover:text-slate-950"
                          >
                            GitHub
                          </a>
                        )}

                      {project.live_url &&
                        project.live_url !== "string" && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
                          >
                            Live Demo
                          </a>
                        )}

                    </div>

                  </div>

                </div>
              ))}

            </div>
          ) : (
            <p className="mt-8 text-slate-400">
              Loading projects...
            </p>
          )}

        </div>

      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="bg-slate-900 px-6 py-24"
      >

        <div className="mx-auto max-w-6xl">

          <h2 className="text-4xl font-bold text-cyan-400">
            Testimonials
          </h2>

          {testimonials.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2">

              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="rounded-xl border border-white/10 bg-slate-950 p-6 transition hover:-translate-y-1 hover:border-cyan-400/50"
                >

                  <div className="text-4xl text-cyan-400">
                    "
                  </div>

                  <p className="mt-3 leading-7 text-slate-300">
                    {testimonial.message}
                  </p>

                  <div className="mt-6 border-t border-white/10 pt-5">

                    <h3 className="text-xl font-semibold">
                      {testimonial.name}
                    </h3>

                    <p className="mt-1 text-cyan-400">
                      {testimonial.role}
                    </p>

                  </div>

                </div>
              ))}

            </div>
          ) : (
            <p className="mt-8 text-slate-400">
              Loading testimonials...
            </p>
          )}

        </div>

      </section>

      {/* Blogs */}
      <section
        id="blogs"
        className="px-6 py-24"
      >

        <div className="mx-auto max-w-6xl">

          <h2 className="text-4xl font-bold text-cyan-400">
            Blogs
          </h2>

          {blogs.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2">

              {blogs.map((blog) => (
                <article
                  key={blog.id}
                  className="overflow-hidden rounded-xl border border-white/10 bg-slate-900 transition hover:-translate-y-1 hover:border-cyan-400/50"
                >

                  {blog.image &&
                    blog.image !== "string" && (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="h-48 w-full object-cover"
                      />
                    )}

                  <div className="p-6">

                    <h3 className="text-2xl font-semibold">
                      {blog.title}
                    </h3>

                    <p className="mt-4 leading-7 text-slate-400">
                      {blog.content}
                    </p>

                  </div>

                </article>
              ))}

            </div>
          ) : (
            <p className="mt-8 text-slate-400">
              Loading blogs...
            </p>
          )}

        </div>

      </section>

      {/* Contact */}
      <section
        id="contact"
        className="bg-slate-900 px-6 py-24"
      >

        <div className="mx-auto max-w-3xl">

          <div className="text-center">

            <h2 className="text-4xl font-bold text-cyan-400">
              Contact Me
            </h2>

            <p className="mt-6 text-slate-400">
              Have a question or want to work together?
              Send me a message.
            </p>

          </div>

          <form
            onSubmit={handleContactSubmit}
            className="mt-10 space-y-6 rounded-xl border border-white/10 bg-slate-950 p-6 md:p-8"
          >

            {/* Name */}
            <div>

              <label
                htmlFor="name"
                className="mb-2 block font-medium text-slate-200"
              >
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={contactForm.name}
                onChange={handleContactChange}
                placeholder="Enter your name"
                required
                className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              />

            </div>

            {/* Email */}
            <div>

              <label
                htmlFor="email"
                className="mb-2 block font-medium text-slate-200"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={contactForm.email}
                onChange={handleContactChange}
                placeholder="Enter your email"
                required
                className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              />

            </div>

            {/* Subject */}
            <div>

              <label
                htmlFor="subject"
                className="mb-2 block font-medium text-slate-200"
              >
                Subject
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                value={contactForm.subject}
                onChange={handleContactChange}
                placeholder="Enter subject"
                required
                className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              />

            </div>

            {/* Message */}
            <div>

              <label
                htmlFor="msg"
                className="mb-2 block font-medium text-slate-200"
              >
                Message
              </label>

              <textarea
                id="msg"
                name="msg"
                value={contactForm.msg}
                onChange={handleContactChange}
                placeholder="Write your message"
                rows="6"
                required
                className="w-full resize-none rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              />

            </div>

            {/* Status */}
            {contactStatus && (
              <p className="text-center text-cyan-400">
                {contactStatus}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSending}
              className="w-full rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>

          </form>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-slate-500">
        © 2026 Sandhya Veldhi. All rights reserved.
      </footer>

    </div>
  );
}

export default App;