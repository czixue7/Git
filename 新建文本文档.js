const cloud = require("wx-server-sdk");

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

module.exports = async (event) => {
    let u = event.data;
    //userId? һ����˵������ʵ��,С�����ṩ��openid,�ȽϷ���
    let wxContext = cloud.getWXContext();
    let openId = wxContext.OPENID;
    //��Ҫ����С��Id��ô��
    let res = await db.collection("test-group").count();
    let groupId = parseInt(res.total) + 1;
    //�ϸ���Ŀ��Ҫ�����ܣ����������������鿴�ĵ�
    await db.collection("test-group").add({
        data: {
            leader: u.nickname,
            region: u.region,
            code: u.code,
            age: u.age,
            info: u.info,
            member: 1,
            openId,
            groupId,
        },
    });
    await db.collection("test-form").add({
        data: {
            nickname: u.nickname,
            gender: u.gender === "nv",
            region: u.region,
            code: u.code,
            age: u.age,
            info: u.info,
            isLeader: true,
            openId,
            groupId,
        },
    });
    return {
        success: true,groupId,
    };
};