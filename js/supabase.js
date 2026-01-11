// ==========================================
// بيانات Supabase
// ==========================================
const SUPABASE_URL = "https://vpxwtoxtjqchxsgodjzf.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZweHd0b3h0anFjaHhzZ29kanpmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODA1Mzk3OCwiZXhwIjoyMDgzNjI5OTc4fQ.9-s7SYHCLT8Dmu3qQwi-hbP2mRW6KTd49Q9pe_NKTgc";

// ==========================================
// تحميل مكتبة Supabase
// ==========================================
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
document.head.appendChild(script);

script.onload = () => {
  window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
};

// ==========================================
// تسجيل مستخدم جديد (Register)
// ==========================================
async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await window.supabase.auth.signUp({
    email, password
  });

  document.getElementById("msg").innerText =
    error ? error.message : "Registered successfully. Check your email.";
}

// ==========================================
// تسجيل دخول (Login)
// ==========================================
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

// ==========================================
// صفحة Dashboard: تحميل بيانات المستخدم
// ==========================================
async function loadUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) window.location.href = "login.html";
  document.getElementById("userEmail").innerText = user.email;
}

// ==========================================
// تسجيل خروج (Logout)
// ==========================================
async function logout() {
  await window.supabase.auth.signOut();
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// ==========================================
// شغل تلقائي لو الصفحة فيها Dashboard
// ==========================================
if (document.getElementById("userEmail")) {
  loadUser();
}
