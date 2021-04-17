import { Form, Button, Input, Popover, Progress, Alert } from 'antd';
import React, { useState } from 'react';
import { Link, FormattedMessage, useIntl } from 'umi';
import styles from './style.less';
import { resetPassword } from './service';

const FormItem = Form.Item;
const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="userandregister.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="userandregister.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="userandregister.strength.short" />
    </div>
  ),
};
const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const SuccessMessage = () => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message="Password Changed Successfully Please login with your new password"
    type="success"
    showIcon
    description={
      <Link className={styles.register} to="/user/login">
        <FormattedMessage id="reset.back-to-login" />
      </Link>
    }
  />
);

const FailureMessage = () => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message="Something went wrong please request a new link"
    type="error"
    showIcon
    description={
      <Link className={styles.register} to="/user/forgot-password">
        <FormattedMessage id="forgotpassword.menu.forgot-password-back" />
      </Link>
    }
  />
);

const ResetPassword = ({ location }: any) => {
  const code = location.query;
  const [popover, setpopover] = useState(false);
  const [visible, setvisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const intl = useIntl();
  const confirmDirty = false;
  const [form] = Form.useForm();

  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');

    if (value && value.length > 9) {
      return 'ok';
    }

    if (value && value.length > 5) {
      return 'pass';
    }

    return 'poor';
  };

  interface resetPasswordTypes {
    password: string;
    passwordConfirmation: string;
  }

  const onFinish = async (values: resetPasswordTypes) => {
    setLoading(true);
    const fields = { ...code, ...values };
    await resetPassword(fields)
      .then((response) => {
        setSuccess(true);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
        setDisabled(true);
      });
  };

  const checkConfirm = (_: any, value: any) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject(
        intl.formatMessage({
          id: 'userandregister.password.twice',
        }),
      );
    }

    return promise.resolve();
  };

  const checkPassword = (_: any, value: string | any[]) => {
    const promise = Promise; // 没有值的情况

    if (!value) {
      setvisible(!!value);
      return promise.reject(
        intl.formatMessage({
          id: 'password.required',
        }),
      );
    } // 有值的情况

    if (!visible) {
      setvisible(!!value);
    }

    setpopover(!popover);

    if (value.length < 6) {
      return promise.reject('');
    }

    if (value && confirmDirty) {
      form.validateFields(['passwordConfirmation']);
    }

    return promise.resolve();
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          // @ts-ignore
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  return (
    <div className={styles.main}>
      <h3 className={styles.title}>
        <FormattedMessage id="userandregister-reset-password" />
      </h3>
      {success && <SuccessMessage />}
      {error && <FailureMessage />}
      <Form form={form} name="UserRegister" onFinish={onFinish}>
        <Popover
          // @ts-ignore
          getPopupContainer={(node) => {
            if (node && node.parentNode) {
              return node.parentNode;
            }
            return node;
          }}
          content={
            visible && (
              <div
                style={{
                  padding: '4px 0',
                }}
              >
                {passwordStatusMap[getPasswordStatus()]}
                {renderPasswordProgress()}
                <div
                  style={{
                    marginTop: 10,
                  }}
                >
                  <FormattedMessage id="userandregister.strength.msg" />
                </div>
              </div>
            )
          }
          overlayStyle={{
            width: 240,
          }}
          placement="right"
          visible={visible}
        >
          <FormItem
            name="password"
            className={
              form.getFieldValue('password') &&
              form.getFieldValue('password').length > 0 &&
              styles.password
            }
            rules={[
              {
                validator: checkPassword,
              },
            ]}
          >
            <Input
              disabled={disabled}
              size="large"
              type="password"
              autoFocus
              placeholder={intl.formatMessage({
                id: 'userandregister.password.placeholder',
              })}
            />
          </FormItem>
        </Popover>
        <FormItem
          name="passwordConfirmation"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'userandregister.confirm-password.required',
              }),
            },
            {
              validator: checkConfirm,
            },
          ]}
        >
          <Input
            disabled={disabled}
            size="large"
            type="password"
            placeholder={intl.formatMessage({
              id: 'userandregister.confirm-password.placeholder',
            })}
          />
        </FormItem>
        <FormItem>
          <Button
            disabled={disabled}
            size="large"
            loading={loading}
            className={styles.submit}
            type="primary"
            htmlType="submit"
          >
            <FormattedMessage id="userandregister-reset-password" />
          </Button>
        </FormItem>
        <FormItem style={{ textAlign: 'center' }}>
          <div className={styles.other}>
            <Link className={styles.register} to="/user/login">
              <FormattedMessage id="userandregister-result.register-result.back-home" />
            </Link>
          </div>
        </FormItem>
      </Form>
    </div>
  );
};

export default ResetPassword;
