// تأثير دخول الصفحة
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// لو عندك زر Open Editor في index.html
const openBtn = document.querySelector(".btn");

if (openBtn) {
  openBtn.addEventListener("click", () => {
    // تأثير بسيط قبل الانتقال
    document.body.classList.remove("loaded");
    setTimeout(() => {
      window.location.href = "editor.html";
    }, 300);
  });
}

/* ===================================
   كود خاص بصفحة الـ Editor
=================================== */

// لو الصفحة فيها Monaco Editor
function runCode() {
  if (window.editor) {
    const code = window.editor.getValue();

    // حالياً: عرض الكود
    alert("Your Code:\n\n" + code);

    // لاحقاً هنا هنضيف:
    // - حفظ في Supabase
    // - تشغيل الكود الحقيقي
  }
}
