// test_db.js
const db = require('./event_db');

async function testConnection() {
  try {
    const [rows] = await db.query('SELECT id, name, event_date, is_active FROM events LIMIT 10;');
    console.log('✅ 数据库连接成功！返回结果如下：');
    console.table(rows);
  } catch (err) {
    console.error('❌ 数据库连接失败：', err.message);
  } finally {
    process.exit(0);
  }
}

testConnection();
