\ENCODING=ISO-8859-1
\Problem name: 

Minimize
 obj: 100 xt(0) + 100 xt(1) + 100 xt(2) + 100 xt(3) + 100 xt(4) + 100 xt(5)
      + 100 xt(6) + 500 yt(0) + 500 yt(1) + 500 yt(2) + 500 yt(3) + 500 yt(4)
      + 500 yt(5) + 500 yt(6) + 50 st(0) + 50 st(1) + 50 st(2) + 50 st(3)
      + 50 st(4) + 50 st(5) + 50 st(6)
Subject To
 c1:  xt(0) - st(0)  = 100
 c2:  xt(1) + st(0) - st(1)  = 800
 c3:  xt(2) + st(1) - st(2)  = 1300
 c4:  xt(3) + st(2) - st(3)  = 1500
 c5:  xt(4) + st(3) - st(4)  = 1000
 c6:  xt(5) + st(4) - st(5)  = 1000
 c7:  xt(6) + st(5) - st(6)  = 1200
 c8:  - xt(0) + 6900 yt(0) >= 0
 c9:  - xt(1) + 6900 yt(1) >= 0
 c10: - xt(2) + 6900 yt(2) >= 0
 c11: - xt(3) + 6900 yt(3) >= 0
 c12: - xt(4) + 6900 yt(4) >= 0
 c13: - xt(5) + 6900 yt(5) >= 0
 c14: - xt(6) + 6900 yt(6) >= 0
Bounds
 0 <= yt(0) <= 1
 0 <= yt(1) <= 1
 0 <= yt(2) <= 1
 0 <= yt(3) <= 1
 0 <= yt(4) <= 1
 0 <= yt(5) <= 1
 0 <= yt(6) <= 1
Binaries
 yt(0)  yt(1)  yt(2)  yt(3)  yt(4)  yt(5)  yt(6) 
End
