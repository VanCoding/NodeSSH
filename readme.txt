NodeSSH
------------------------------------------------------------------------

NodeSSH is a lightweight SSH client for node.js.
It uses OpenSSH and expect. Make sure you have installed this software.

To install the software, use the following command:
$ apt-get install openssh expect



How to use
------------------------------------------------------------------------

Check out the file "sample.js". It should tell you all you need ;)



What is expect for?
------------------------------------------------------------------------

It is not possible to pass your password in the commandline to ssh.
That´s why we must use a trick.

expect waits until "password:" is displayed, and then sends
the password to the ssh process. After that, it gives to control back to
us.

To see how it works, check out the file "login.exp".
