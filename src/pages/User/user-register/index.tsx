import { Form, Button, Input, Popover, Progress, message } from 'antd';
import type { FC } from 'react';
import React, { useState, useEffect } from 'react';
import type { Dispatch } from 'umi';
import { Link, connect, history, FormattedMessage, useIntl } from 'umi';
import type { StateType } from './model';
import styles from './style.less';

const FormItem = Form.Item;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="teamRegister.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="teamRegister.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="teamRegister.strength.short" />
    </div>
  ),
};

const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

interface RegisterProps {
  dispatch: Dispatch;
  teamRegister: StateType;
  submitting: boolean;
}

export interface UserRegisterParams {
  email: string;
  password: string;
  confirm_password: string;
  mobile: string;
  captcha: string;
  prefix: string;
}

const Register: FC<RegisterProps> = ({ submitting, dispatch, teamRegister, location }) => {
  const [code] = useState(location.query);
  console.log('🚀 ~ file: index.tsx ~ line 56 ~ code', code);
  const intl = useIntl();
  const [visible, setvisible]: [boolean, any] = useState(false);
  const [popover, setpopover]: [boolean, any] = useState(false);
  const confirmDirty = false;
  let interval: number | undefined;
  const [form] = Form.useForm();

  useEffect(() => {
    if (!teamRegister) {
      return;
    }
    const account = form.getFieldValue('email');
    if (teamRegister.status === 'ok') {
      message.success('Registration Successfull');
      history.push({
        pathname: '/user/register-result',
        state: {
          account,
        },
      });
    } else {
      if (teamRegister.status) message.error(teamRegister.status, 10);
      return;
    }
    return () => {
      dispatch({
        type: 'teamRegister/reset',
      });
    };
  }, [teamRegister]);
  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [],
  );

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
  const onFinish = (values: Record<string, any>) => {
    const organisation_members = { organisation_members: JSON.parse(`[${code.omId}]`) };
    const finalValues: any = { ...values, ...organisation_members };
    delete finalValues.organisationName;
    console.log('🚀 ~ file: index.tsx ~ line 116 ~ onFinish ~ finalValues', finalValues);
    dispatch({
      type: 'teamRegister/submit',
      payload: {
        ...finalValues,
      },
    });
  };

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject(intl.formatMessage({ id: 'teamRegister.password.twice' }));
    }
    return promise.resolve();
  };
  const checkPassword = (_: any, value: string) => {
    const promise = Promise;
    // 没有值的情况
    if (!value) {
      setvisible(!!value);
      return promise.reject(intl.formatMessage({ id: 'teamRegister.password.required' }));
    }
    // 有值的情况
    if (!visible) {
      setvisible(!!value);
    }
    setpopover(!popover);
    if (value.length < 6) {
      return promise.reject('');
    }
    if (value && confirmDirty) {
      form.validateFields(['confirm_password']);
    }
    return promise.resolve();
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
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
      <h3>
        <FormattedMessage id="teamRegister.register.register" />
      </h3>
      <Form form={form} name="UserRegister" onFinish={onFinish}>
        <FormItem
          name="first_name"
          initialValue={code?.first_name}
          rules={[
            {
              required: true,
              message: 'First Name required',
            },
          ]}
        >
          <Input size="large" placeholder="First Name" />
        </FormItem>
        <FormItem
          name="last_name"
          initialValue={code?.last_name}
          rules={[
            {
              required: true,
              message: 'Last Name required',
            },
          ]}
        >
          <Input size="large" placeholder="Last Name" />
        </FormItem>
        <FormItem
          name="organisationName"
          initialValue={code?.org_name}
          rules={[
            {
              required: true,
              message: 'Company required',
            },
          ]}
        >
          <Input disabled size="large" placeholder="Company" />
        </FormItem>

        <FormItem
          name="email"
          initialValue={code?.email}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'teamRegister.email.required' }),
            },
            {
              type: 'email',
              message: intl.formatMessage({ id: 'teamRegister.email.wrong-format' }),
            },
          ]}
        >
          <Input
            disabled
            size="large"
            placeholder={intl.formatMessage({ id: 'teamRegister.email.placeholder' })}
          />
        </FormItem>
        <Popover
          getPopupContainer={(node) => {
            if (node && node.parentNode) {
              return node.parentNode as HTMLElement;
            }
            return node;
          }}
          content={
            visible && (
              <div style={{ padding: '4px 0' }}>
                {passwordStatusMap[getPasswordStatus()]}
                {renderPasswordProgress()}
                <div style={{ marginTop: 10 }}>
                  <FormattedMessage id="teamRegister.strength.msg" />
                </div>
              </div>
            )
          }
          overlayStyle={{ width: 240 }}
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
              size="large"
              type="password"
              placeholder={intl.formatMessage({ id: 'teamRegister.password.placeholder' })}
            />
          </FormItem>
        </Popover>
        <FormItem
          name="confirm_password"
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'teamRegister.confirm-password.required' }),
            },
            {
              validator: checkConfirm,
            },
          ]}
        >
          <Input
            size="large"
            type="password"
            placeholder={intl.formatMessage({ id: 'teamRegister.confirm-password.placeholder' })}
          />
        </FormItem>
        <FormItem>
          <Button
            size="large"
            loading={submitting}
            className={styles.submit}
            type="primary"
            htmlType="submit"
          >
            <FormattedMessage id="teamRegister.register.register" />
          </Button>
          <Link className={styles.login} to="/user/login">
            <FormattedMessage id="teamRegister.register.sign-in" />
          </Link>
        </FormItem>
      </Form>
    </div>
  );
};
export default connect(
  ({
    teamRegister,
    loading,
  }: {
    teamRegister: StateType;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    teamRegister,
    submitting: loading.effects['teamRegister/submit'],
  }),
)(Register);
