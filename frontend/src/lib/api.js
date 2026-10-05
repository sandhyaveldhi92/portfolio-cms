
const API_BASE_URL = "http://127.0.0.1:8000";


// ===============================
// ABOUT
// ===============================
export const getAbout = async () => {
    const response = await fetch(`${API_BASE_URL}/api/about`);
    if (!response.ok) {
        throw new Error("Failed to fetch About data");
    }
    return response.json();
};


// ===============================
// SKILLS
// ===============================
export const getSkills = async () => {
    const response = await fetch(`${API_BASE_URL}/api/skills`);
    if (!response.ok) {
        throw new Error("Failed to fetch Skills data");
    }
    return response.json();
};


// ===============================
// PROJECTS
// ===============================
export const getProjects = async () => {
    const response = await fetch(`${API_BASE_URL}/api/projects`);
    if (!response.ok) {
        throw new Error("Failed to fetch Projects data");
    }
    return response.json();
};


// ===============================
// EXPERIENCE
// ===============================
export const getExperience = async () => {
    const response = await fetch(`${API_BASE_URL}/api/experience`);
    if (!response.ok) {
        throw new Error("Failed to fetch Experience data");
    }
    return response.json();
};


// ===============================
// SERVICES
// ===============================
export const getServices = async () => {
    const response = await fetch(`${API_BASE_URL}/api/services`);
    if (!response.ok) {
        throw new Error("Failed to fetch Services data");
    }
    return response.json();
};


// ===============================
// TESTIMONIALS
// ===============================
export const getTestimonials = async () => {
    const response = await fetch(`${API_BASE_URL}/api/testimonials`);
    if (!response.ok) {
        throw new Error("Failed to fetch Testimonials data");
    }
    return response.json();
};


// ===============================
// BLOGS
// ===============================
export const getBlogs = async () => {
    const response = await fetch(`${API_BASE_URL}/api/blogs`);
    if (!response.ok) {
        throw new Error("Failed to fetch Blogs data");
    }
    return response.json();
};


// ===============================
// CONTACT
// ===============================
export const sendContactMessage = async (data) => {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.msg,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
            errorData?.detail
                ? JSON.stringify(errorData.detail)
                : "Failed to send message"
        );
    }

    return response.json();
};

