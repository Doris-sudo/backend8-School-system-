export const validEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validPassword = (password) => {
    return (
        typeof password === "string" &&
        password.length >= 6 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password)
    );
};

export const validRole = (role) => {
    return ["admin", "teacher", "student"].includes(role);
};

export const validId = (id) => {
    return Number.isInteger(Number(id)) && Number(id) > 0;
};

export const validScore = (score) => {
    return typeof score === "number" && score >= 0 && score <= 100;
};

export const getGrade = (score) => {
    if (score >= 70) {
        return "A";
    }

    if (score >= 60) {
        return "B";
    }

    if (score >= 50) {
        return "C";
    }

    if (score >= 45) {
        return "D";
    }

    if (score >= 40) {
        return "E";
    }

    return "F";
};