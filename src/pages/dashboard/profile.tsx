import React, { useState } from 'react'
import Image from 'next/image'
import { DashboardLayout, Button } from 'components/pages/dashboard'
import {
  ActivitiesItem,
  ProfileCardHeader,
  VerifyUserItem
} from 'components/pages/dashboard/macros'

// icons and images
import ReputationBadge from 'assets/ReputationBadge.svg'
import InviteIcon from 'assets/InviteIcon.svg'
import Graph from 'assets/dashboard/graph.svg'
import { useAppSelector } from 'store/hooks'
import http from 'services/http-common'
import { useQuery } from 'react-query'
import InviteModal from 'components/pages/home/InviteModal'
import { useRouter } from 'next/router'

const Profile = () => {
  const router = useRouter()

  const { selectedAccount } = useAppSelector(state => state.auth)

  const [isInviteVisible, setIsInviteVisible] = useState(false)

  const toggleIsInviteVisible = () => {
    setIsInviteVisible(prev => !prev)
  }

  const getProfileStats = async () => {
    const response = await http.get(`/getProfileStats`)
    return response.data.data
  }

  const { data: stats } = useQuery({
    queryKey: `getProfileStats`,
    queryFn: getProfileStats
  })

  const getInvitedUsers = async () => {
    const response = await http.get(`/getInvitedUsers`)
    return response.data.data
  }

  const { data: invitedUsers, refetch } = useQuery({
    queryKey: `getInvitedUsers`,
    queryFn: getInvitedUsers
  })

  return (
    <DashboardLayout>
      <div className='flex flex-col gap-2'>
        <ProfileCardHeader heading='Reputation'>
          <div className='w-full flex flex-row items-center justify-between'>
            <p className='text-[20px] font-[500] leading-7 text-body'>
              Level
            </p>
            <div className='relative'>
              <Image
                src={ReputationBadge}
                alt='repo'
                height={77}
                width={76}
                className='h-[50px] w-[49px] md:w-[76px] md:h-[77px]'
              />
              <p className='absolute top-[10%] md:top-[20%] left-[40%] text-lg md:text-[24px] text-primary font-[700] leading-[33px]'>
                {selectedAccount?.reputation}
              </p>
            </div>
          </div>
        </ProfileCardHeader>
        <ProfileCardHeader heading='Invitations'>
          {selectedAccount?.verified ? (
            <>
              <div className='w-full flex flex-row items-center justify-between'>
                <p className='text-base font-[400] leading-[25px] text-grayMd'>
                  {/* {selectedAccount?.invites?.allowedLimit} Available ( */}
                  {invitedUsers?.length} Invited
                </p>
                <Button
                  text='Invite Friends'
                  icon={InviteIcon}
                  className='md:!w-[147px]'
                  onClick={() => toggleIsInviteVisible()}
                />
              </div>
              {invitedUsers?.length > 0 ? (
                <p className='text-sm font-[500] leading-[22px] text-[#213642]'>
                  List of Invited Friends
                </p>
              ) : null}
              <div className='flex flex-col gap-2 max-h-[370px] overflow-auto'>
                {invitedUsers?.length > 0 &&
                  invitedUsers?.map((user: any) => (
                    <VerifyUserItem
                      key={user._id}
                      email={user?.useremail}
                      status={user?.status}
                      accepted={user?.accepted}
                      refetchInvitedUser={refetch}
                      isVerified={user?.verified}
                    />
                  ))}
              </div>
            </>
          ) : (
            <p className='text-sm md:text-base font-[400] leading-[25px] text-grayMd py-2'>
              No invitation Available yet.
            </p>
          )}
        </ProfileCardHeader>
        <ProfileCardHeader heading='Activities'>
          <div className='w-full flex flex-col md:flex-row md:items-center md:justify-between gap-8'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-row gap-10'>
                <ActivitiesItem
                  name='Posts'
                  desc={stats?.totalPosts ?? 0}
                  isLink
                  onClick={() =>
                    router.push('/dashboard/posts/posted')
                  }
                />
                <ActivitiesItem
                  name='Bookmarks'
                  desc={stats?.bookmarksCount ?? 0}
                  isLink
                  onClick={() =>
                    router.push('/dashboard/posts/bookmarks')
                  }
                />
              </div>
              {/* <div className='flex flex-row gap-10'>
                <ActivitiesItem name='Searched' desc='112 Topics' />
                <ActivitiesItem name='Translated' desc='500 μ' />
              </div> */}
              <div className='flex flex-row gap-10'>
                <ActivitiesItem
                  name='Upvotes'
                  desc={stats?.upvotesCount ?? 0}
                />
                <ActivitiesItem
                  name='Downvotes'
                  desc={stats?.downvotesCount ?? 0}
                />
                <ActivitiesItem
                  name='Tips'
                  desc={stats?.tipsCount ?? 0}
                  className='hidden xl:block'
                />
              </div>
              <ActivitiesItem
                name='Tips'
                desc={stats?.tipsCount ?? 0}
                className='xl:hidden'
              />
              {selectedAccount?.verified ? (
                <ActivitiesItem
                  name='Invite Friends'
                  // desc={`${selectedAccount?.invites?.allowedLimit} Available (
                  // ${selectedAccount?.invites?.invited} Invited)`}
                  desc={`${invitedUsers?.length} Invited`}
                />
              ) : null}
            </div>
            <Image
              src={Graph}
              alt='graph'
              height={100}
              width={100}
              className='w-full h-auto md:max-w-[599px] max-h-[301px]'
            />
          </div>
        </ProfileCardHeader>
      </div>
      <InviteModal
        isInviteVisible={isInviteVisible}
        toggleIsInviteVisible={toggleIsInviteVisible}
        refetchInvites={refetch}
      />
    </DashboardLayout>
  )
}

export default Profile
