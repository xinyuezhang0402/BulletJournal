import React, { useState } from 'react';

import './admin.styles.less';
import {
  Avatar,
  Button,
  Collapse,
  Empty,
  Input,
  Select,
  Tooltip,
  Table,
  Tabs,
} from 'antd';
import {
  getUsersByRole,
  setRole,
  changePoints,
  getLockedUsersAndIPs,
  unlockUserandIP,
  lockUserandIP,
} from '../../features/admin/actions';
import { IState } from '../../store';
import { connect } from 'react-redux';
import { Role, LockedUser, LockedIP } from '../../features/admin/interface';
import { User } from '../../features/group/interface';
import { DeleteOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { Option } = Select;
const { TabPane } = Tabs;

type AdminProps = {
  usersByRole: User[];
  lockedUsers: LockedUser[];
  lockedIPs: LockedIP[];
  setRole: (username: string, role: Role) => void;
  changePoints: (username: string, points: number) => void;
  getUsersByRole: (role: Role) => void;
  getLockedUsersAndIPs: () => void;
  unlockUserandIP: (name: string, ip: string) => void;
  lockUserandIP: (name: string, ip: string, reason: string) => void;
};

const AdminPage: React.FC<AdminProps> = (props) => {
  const {
    setRole,
    changePoints,
    lockedUsers,
    lockedIPs,
    usersByRole,
    getUsersByRole,
    getLockedUsersAndIPs,
    unlockUserandIP,
    lockUserandIP,
  } = props;
  const [username, setUsername] = useState('');
  const [roleLevel, setRoleLevel] = useState('BASIC' as Role);
  const [pointsName, changePointsName] = useState('');
  const [userPoints, setUserPoints] = useState(0);
  const [lockName, setLockName] = useState('');
  const [lockIP, setLockIP] = useState('');
  const [lockReason, setLockReason] = useState('');
  const columns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Expire Time (Hours)',
      dataIndex: 'expirationInHour',
      key: 'expirationInHour',
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      render: (a: any) => (
        <Tooltip placement='left' title='Unblock User'>
          <DeleteOutlined
            onClick={() => {
              unlockUserandIP(a.name, '');
            }}
          />
        </Tooltip>
      ),
    },
  ];
  const IPcolumns = [
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Expire Time (Hours)',
      dataIndex: 'expirationInHour',
      key: 'expirationInHour',
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      render: (a: any) => (
        <Tooltip placement='left' title='Unblock User'>
          <DeleteOutlined
            onClick={() => {
              unlockUserandIP('', a.ip);
            }}
          />
        </Tooltip>
      ),
    },
  ];

  const handleLockUsers = () => {
    lockUserandIP(lockName, lockIP, lockReason);
    setLockIP('');
    setLockName('');
    setLockReason('');
  };

  return (
    <div className='admin-page'>
      <Collapse defaultActiveKey={['userRoles', 'lockUsers', 'userPoints']}>
        <Panel header='User Roles' key='userRoles'>
          <div className='user-role-control'>
            <Tooltip title='Select Role'>
              <span>
                <Select
                  className='role-dropdown'
                  value={roleLevel}
                  onChange={(v) => {
                    setRoleLevel(v as Role);
                  }}
                >
                  {Object.values(Role).map((r: string) => {
                    return (
                      <Option value={r} key={r}>
                        {r}
                      </Option>
                    );
                  })}
                </Select>
              </span>
            </Tooltip>
            <Input
              allowClear={true}
              style={{ width: '120px' }}
              value={username}
              placeholder='Username'
              onChange={(e: any) => {
                setUsername(e.target.value);
              }}
            />
            <Button
              className='button'
              type='primary'
              onClick={() => {
                setRole(username, roleLevel);
              }}
            >
              Set Role
            </Button>
            <Button
              className='button'
              type='primary'
              onClick={() => {
                getUsersByRole(roleLevel);
              }}
            >
              Get Users by Role
            </Button>
          </div>
          {usersByRole && usersByRole.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            <div className='users-with-role'>
              {usersByRole.map((u) => {
                return (
                  <span style={{ marginBottom: '20px' }} key={u.name}>
                    <Avatar src={u.avatar} />
                    &nbsp;&nbsp;
                    {u.name}
                  </span>
                );
              })}
            </div>
          )}
        </Panel>
        <Panel header='Lock Users' key='lockUsers'>
          <div className='lock-user-row'>
            <Input
              disabled={lockIP.length > 0}
              style={{ width: '170px' }}
              value={lockName}
              placeholder='Username'
              onChange={(e: any) => {
                setLockName(e.target.value);
              }}
            />
            &nbsp;&nbsp;&nbsp;OR&nbsp;&nbsp;&nbsp;
            <Input
              disabled={lockName.length > 0}
              style={{ width: '170px' }}
              value={lockIP}
              placeholder='IP'
              onChange={(e: any) => {
                setLockIP(e.target.value);
              }}
            />
            <Button
              type='primary'
              onClick={handleLockUsers}
              style={{ marginLeft: '20px' }}
            >
              Lock User
            </Button>
          </div>
          <div className='lock-user-row'>
            <Input
              placeholder='Reason'
              style={{ width: '500px' }}
              value={lockReason}
              onChange={(e: any) => {
                setLockReason(e.target.value);
              }}
            />
          </div>
          <div className='lock-user-row'>
            <Button type='primary' onClick={getLockedUsersAndIPs}>
              Get Blocked Users
            </Button>
          </div>
          <Tabs defaultActiveKey={'user'}>
            <TabPane tab={<span>Users</span>} key='users'>
              <Table columns={columns} dataSource={lockedUsers} />
            </TabPane>
            <TabPane tab={<span>IPs</span>} key='ips'>
              <Table columns={IPcolumns} dataSource={lockedIPs} />
            </TabPane>
          </Tabs>
        </Panel>
        <Panel header='User Points' key='userPoints'>
          <Input
            style={{ width: '150px', marginRight: '30px' }}
            placeholder='Username'
            value={pointsName}
            onChange={(e) => {
              changePointsName(e.target.value);
            }}
          />
          <Tooltip title='type a positive number to add points or a negetive number to minus'>
            <Input
              style={{ width: '150px', marginRight: '30px' }}
              placeholder='Points'
              value={userPoints}
              onChange={(e) => {
                console.log(e.target.value);
                const n = e.target.value;
                if (n && !isNaN(parseInt(n))) {
                  setUserPoints(parseInt(n));
                } else setUserPoints(0);
              }}
            />
          </Tooltip>
          <Button
            type='primary'
            onClick={() => {
              changePoints(pointsName, userPoints);
            }}
          >
            Change Points
          </Button>
        </Panel>
      </Collapse>
    </div>
  );
};

const mapStateToProps = (state: IState) => ({
  usersByRole: state.admin.usersByRole,
  lockedUsers: state.admin.lockedUsers,
  lockedIPs: state.admin.lockedIPs,
});

export default connect(mapStateToProps, {
  setRole,
  getUsersByRole,
  getLockedUsersAndIPs,
  unlockUserandIP,
  lockUserandIP,
  changePoints,
})(AdminPage);
