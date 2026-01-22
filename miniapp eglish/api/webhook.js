// File: api/webhook.js
export default async function handler(req, res) {
    // 1. Cấu hình CORS (Để Web của bạn được phép gửi tin đến đây)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Xử lý khi trình duyệt "hỏi đường" (Preflight request)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 2. LINK BIZFLY CHUẨN (Đã cập nhật theo link bạn gửi)
    const BIZFLY_URL = "https://crm.bizfly.vn/public-api/public/webhook?id=6970a4710943faa51a0310f2&crm_token=2ec0d7a4634e99c3e5ef07ae52984974f1d18908&project_id=695b85c8320583313135ddfa";

    try {
        // 3. Server Vercel thay mặt bạn gửi dữ liệu sang Bizfly
        const response = await fetch(BIZFLY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body) 
        });

        if (response.ok) {
            return res.status(200).json({ message: "Gửi Bizfly thành công" });
        } else {
            const text = await response.text();
            return res.status(response.status).json({ error: "Bizfly từ chối", details: text });
        }
    } catch (error) {
        return res.status(500).json({ error: "Lỗi Server Vercel: " + error.message });
    }
}