export const FOUNDER_DATA = {
    name: "Alfas",
    dob: "2001-12-25",
    get age() {
        const birthDate = new Date(this.dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    },
    role: "Founder & CEO",
    company: "Delvare.in",
    bio: "I ship business solutions under the mentioned categories. What started as an outburst of freelance services fueled by strong networking and commitments has now evolved into a structured enterprise.",
    profileUrl: "/assets/placeholder-founder.jpg", // Placeholder until we have a real image
    socials: {
        github: "https://github.com/binaryraft",
        linkedin: "https://in.linkedin.com/in/alfas-b-717054222"
    },
    skills: [
        "Software Engineering",
        "System Architecture",
        "Cyber Security",
        "Business Strategy",
        "UI/UX Design",
        "Cloud Computing"
    ]
};
