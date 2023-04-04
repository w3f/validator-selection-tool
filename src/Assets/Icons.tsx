interface IconProps {
  size?: string
  className?: string
}

export function PolkadotTokenIcon({ size, className }: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size ? size : "16"}
      height={size ? size : "16"}
      fill="none"
      viewBox="0 0 23 23"
    >
      <path
        fill="#E6007A"
        d="M11.064 5.3c2.106 0 3.813-.996 3.813-2.225 0-1.23-1.707-2.226-3.813-2.226S7.25 1.846 7.25 3.075 8.958 5.3 11.064 5.3zM11.064 22.064c2.106 0 3.813-.996 3.813-2.225 0-1.23-1.707-2.226-3.813-2.226s-3.813.997-3.813 2.226 1.707 2.225 3.813 2.225zM5.75 8.378c1.052-1.83 1.046-3.81-.015-4.425-1.062-.615-2.775.37-3.828 2.2s-1.047 3.81.015 4.425c1.06.615 2.775-.37 3.827-2.2zM20.221 16.76c1.053-1.829 1.047-3.81-.015-4.425-1.06-.615-2.774.37-3.827 2.2s-1.047 3.81.015 4.425c1.06.615 2.775-.37 3.827-2.2zM5.735 18.96c1.06-.614 1.067-2.596.014-4.425-1.052-1.83-2.766-2.814-3.827-2.2-1.062.615-1.068 2.596-.015 4.426 1.053 1.83 2.766 2.814 3.828 2.2zM20.206 10.578c1.062-.615 1.068-2.596.015-4.425-1.052-1.83-2.766-2.815-3.827-2.2-1.062.614-1.068 2.596-.015 4.425 1.053 1.83 2.766 2.815 3.827 2.2z"
      ></path>
    </svg>
  )
}

export function PolkadotIcon({ size, className }: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size ? size : "100"}
      fill="none"
      viewBox="0 0 100 22"
    >
      <path
        fill="#000"
        fillOpacity="0.89"
        d="M31.829 3.557c-1.157 0-2.273.145-2.728.27-.661.186-.826.476-.95 1.077l-2.625 12.148c-.041.249-.082.456-.082.663 0 .602.392.995 1.033.995.702 0 .992-.456 1.136-1.16l.744-3.462c.517.062 1.199.124 2.17.124 4.278 0 6.943-2.322 6.943-5.825 0-3.068-2.128-4.83-5.641-4.83zm-1.405 8.665c-.662 0-1.178-.02-1.654-.083l1.385-6.447a12.389 12.389 0 011.736-.145c2.273 0 3.43 1.078 3.43 2.86 0 2.28-1.653 3.815-4.898 3.815zM99.153 14.71c-.351 0-.579.207-1.013.684-.764.788-1.24 1.223-1.838 1.223-.538 0-.827-.435-.827-1.14 0-.394.083-.87.186-1.39l.765-3.606h2.294c.723 0 1.157-.415 1.157-1.161 0-.415-.268-.726-.888-.726h-2.15l.372-1.679c.04-.248.082-.476.082-.684 0-.58-.392-.995-1.033-.995-.682 0-.992.456-1.136 1.161l-.476 2.197h-.97c-.745 0-1.179.415-1.179 1.161 0 .415.29.726.91.726h.847l-.765 3.565a8.656 8.656 0 00-.186 1.7c0 1.68.868 2.902 2.728 2.902 1.074 0 2.025-.539 2.748-1.182.703-.622 1.219-1.388 1.219-1.886a.856.856 0 00-.847-.87zM51.626 4.78c0-.602-.414-.995-1.054-.995-.682 0-.992.456-1.137 1.16L46.852 16.99a2.735 2.735 0 00-.103.663c0 .602.413.995 1.033.995.703 0 1.013-.456 1.157-1.16l2.584-12.045c.04-.248.103-.456.103-.663zM88.51 8.387c-3.306 0-5.558 3.296-5.558 6.426 0 .059.002.117.003.175-.518.79-1.18 1.608-1.635 1.608-.331 0-.455-.31-.455-.788 0-.58.165-1.554.351-2.404l1.716-7.96c.04-.25.082-.457.082-.664 0-.602-.392-.995-1.033-.995-.703 0-.992.456-1.137 1.16l-.93 4.313c-.496-.519-1.22-.871-2.314-.871-2.196 0-4.404 1.696-5.265 4.296-.948 2.459-1.795 3.913-2.463 3.913-.248 0-.393-.207-.393-.56 0-1.036.579-3.565.826-4.788.083-.456.124-.643.124-.912 0-.913-1.508-1.99-3.471-1.99-2.27 0-4.326 1.442-5.357 3.585-1.531 2.714-2.936 4.665-3.632 4.665-.31 0-.413-.393-.496-.767l-.516-2.86 3.161-2.592c.29-.248.661-.601.661-1.057 0-.56-.372-.933-.93-.933-.413 0-.764.25-1.115.54l-4.752 3.938 1.59-7.422c.042-.248.104-.456.104-.663 0-.602-.413-.995-1.054-.995-.682 0-.992.456-1.136 1.16L50.903 16.99a2.745 2.745 0 00-.104.663c0 .602.414.995 1.034.995.702 0 1.012-.456 1.157-1.16l.33-1.555 1.943-1.576.475 2.405c.186.953.682 1.886 1.963 1.886 1.275 0 2.277-1.168 3.282-2.745.305 1.652 1.477 2.745 3.104 2.745 1.632 0 2.748-.974 3.471-2.28v.041c0 1.348.682 2.24 1.88 2.24 1.084 0 1.984-.656 2.788-2.05.456 1.215 1.476 2.05 2.895 2.05 1.673 0 2.872-1.016 3.636-2.426v.124c0 1.493.744 2.302 1.963 2.302 1.077 0 1.992-.627 2.773-1.648.594 1.02 1.658 1.648 3.096 1.648 3.306 0 5.559-3.296 5.559-6.447 0-2.219-1.343-3.815-3.637-3.815zM67.91 12.595c-.6 2.591-1.88 4.063-3.327 4.063-.972 0-1.509-.746-1.509-1.865 0-2.198 1.591-4.56 3.719-4.56.64 0 1.136.186 1.57.455l-.453 1.907zm11.51-1.098c-.662 3.047-2.17 5.162-3.823 5.162-.91 0-1.447-.705-1.447-1.866 0-2.218 1.53-4.519 3.575-4.519.785 0 1.385.27 1.818.622l-.124.6zm7.418 5.161c-1.198 0-1.694-.87-1.694-1.97 0-2.01 1.384-4.31 3.12-4.31 1.198 0 1.695.87 1.695 1.968 0 2.032-1.385 4.312-3.12 4.312zM42.616 8.387c-3.306 0-5.559 3.296-5.559 6.426 0 2.239 1.343 3.835 3.637 3.835 3.307 0 5.56-3.296 5.56-6.447 0-2.218-1.344-3.814-3.638-3.814zm-1.674 8.271c-1.198 0-1.694-.87-1.694-1.97 0-2.01 1.384-4.311 3.12-4.311 1.199 0 1.695.87 1.695 1.97 0 2.03-1.385 4.311-3.12 4.311z"
      ></path>
      <path
        fill="#E6007A"
        d="M11.064 4.844c2.106 0 3.813-.997 3.813-2.226 0-1.23-1.707-2.226-3.813-2.226s-3.813.997-3.813 2.226c0 1.23 1.707 2.226 3.813 2.226zM11.064 21.608c2.106 0 3.813-.997 3.813-2.226 0-1.23-1.707-2.226-3.813-2.226s-3.813.997-3.813 2.226c0 1.23 1.707 2.226 3.813 2.226zM5.75 7.922c1.052-1.83 1.046-3.811-.016-4.426-1.06-.614-2.774.37-3.827 2.2s-1.047 3.81.015 4.425c1.06.615 2.774-.37 3.827-2.2zM20.221 16.304c1.053-1.83 1.047-3.811-.014-4.426-1.062-.614-2.775.37-3.828 2.2s-1.047 3.81.015 4.425c1.06.615 2.775-.37 3.828-2.2zM5.734 18.503c1.062-.614 1.068-2.595.015-4.425-1.053-1.83-2.766-2.814-3.827-2.2-1.062.615-1.068 2.596-.015 4.426 1.053 1.83 2.766 2.814 3.827 2.2zM20.207 10.121c1.06-.614 1.067-2.596.014-4.425-1.052-1.83-2.766-2.814-3.827-2.2-1.061.615-1.068 2.596-.015 4.426 1.053 1.829 2.766 2.814 3.828 2.2z"
      ></path>
    </svg>
  )
}

export function ArrowUpIcon({ size, className }: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size ? size : "24"}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 28 28"
    >
      <path d="M14.009 3v23M4 12.2L14.009 2 24 12.2" data-nofill="true"></path>
    </svg>
  )
}

export function ArrowDownIcon({ size, className }: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size ? size : "24"}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 28 28"
    >
      <path d="M13.991 25V2M24 15.8L13.991 26 4 15.8" data-nofill="true"></path>
    </svg>
  )
}
