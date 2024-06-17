declare const AWS: any; // 전역 AWS 객체 선언

// AWS SDK 초기화
AWS.config.update({
	region: import.meta.env.VITE_APP_S3_REGION,
	accessKeyId: import.meta.env.VITE_APP_S3_ACCESS_KEY_ID,
	secretAccessKey: import.meta.env.VITE_APP_S3_SECRET_ACCESS_KEY,
});

// AWS STS 프로토타입 업데이트
AWS.util.update(AWS.STS.prototype, {
	credentialsFrom: function (t: any, r: any) {
		if (t) {
			if (!r) r = new AWS.TemporaryCredentials();
			r.expired = false;
			r.accessKeyId = t.Credentials.AccessKeyId;
			r.sessionToken = t.Credentials.SessionToken;
			r.expireTime = t.Credentials.Expiration;
			return r;
		}
		return null;
	},
	assumeRoleWithWebIdentity: function (t: any, r: any) {
		return this.makeUnauthenticatedRequest('assumeRoleWithWebIdentity', t, r);
	},
});

export default AWS;
