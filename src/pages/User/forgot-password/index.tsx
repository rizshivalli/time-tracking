import { FormattedMessage, useIntl, Link } from 'umi';
import React, { useState } from 'react';
import { Form, Button, Input, Alert, message } from 'antd';
import styles from './style.less';
import { forgotPassword } from './service';

const FormItem = Form.Item;

const SuccessMessage = () => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message="Email with password reset link is sent to your email address"
    type="success"
    showIcon
  />
);

const ForgotPassword = () => {
  const [successAlert, setSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const intl = useIntl();
  const [form] = Form.useForm();
  const onFinish = async (values: { email: string }) => {
    setLoading(true);
    await forgotPassword(values)
      .then((response) => {
        setSuccessAlert(true);
      })
      .catch((error) => {
        message.error('Something went wrong, Please try again');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.main}>
      {successAlert && <SuccessMessage />}
      <h3 className={styles.title}>
        <FormattedMessage id="userandregister-forgot-password" />
      </h3>
      <p>Please enter your email address and we will send you info on how to reset your password</p>
      <Form form={form} name="ForgotPassword" onFinish={onFinish}>
        <FormItem
          name="email"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'userandregister.email.required',
              }),
            },
            {
              type: 'email',
              message: intl.formatMessage({
                id: 'userandregister.email.wrong-format',
              }),
            },
          ]}
        >
          <Input
            autoCapitalize="none"
            disabled={loading}
            autoFocus
            size="large"
            placeholder={intl.formatMessage({
              id: 'userandregister.email.placeholder',
            })}
          />
        </FormItem>
        <FormItem>
          <Button
            size="large"
            loading={loading}
            className={styles.submit}
            type="primary"
            htmlType="submit"
          >
            <FormattedMessage id="userandregister.form.submit" />
          </Button>
          <div className={styles.other}>
            <Link
              disabled={loading}
              className={styles.register}
              style={{ width: '100%', textAlign: 'center' }}
              to="/user/login"
            >
              <FormattedMessage id="userandregister-result.register-result.back-home" />
            </Link>
          </div>
        </FormItem>
      </Form>
    </div>
  );
};

export default ForgotPassword;
