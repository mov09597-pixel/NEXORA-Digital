// ضع بيانات Supabase هنا
const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
const SUPABASE_KEY = "YOUR_ANON_PUBLIC_KEY";

// تحميل مكتبة Supabase
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
document.head.appendChild(script);

script.onload = () => {
  window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
};

// ===== Register =====
async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await window.supabase.auth.signUp({
    email, password
  });

  document.getElementById("msg").innerText =
    error ? error.message : "Registered successfully. Check your email.";
}

// ===== Login =====
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await window.supabase.auth.signInWithPassword({
    email, password
  });

  if (error) {
    document.getElementById("msg").innerText = error.message;
  } else {
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "dashboard.html";
  }
}

// ===== Dashboard load =====
async function loadUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) window.location.href = "login.html";
  document.getElementById("userEmail").innerText = user.email;
}

// ===== Logout =====
async function logout() {
  await window.supabase.auth.signOut();
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// تشغيل تلقائي لو في dashboard
if (document.getElementById("userEmail")) {
  loadUser();
}
