\ENCODING=ISO-8859-1
\Problem name: 

Minimize
 obj: 100 xt(0) + 100 xt(1) + 100 xt(2) + 5000 yt(0) + 5000 yt(1) + 5000 yt(2)
      + 5 st(0) + 5 st(1) + 5 st(2)
Subject To
 c1: xt(0) - st(0)  = 0
 c2: xt(1) + st(0) - st(1)  = 1400
 c3: xt(2) + st(1) - st(2)  = 100
 c4: - xt(0) + 1550 yt(0) >= 0
 c5: - xt(1) + 1550 yt(1) >= 0
 c6: - xt(2) + 1550 yt(2) >= 0
Bounds
 0 <= yt(0) <= 1
 0 <= yt(1) <= 1
 0 <= yt(2) <= 1
Binaries
 yt(0)  yt(1)  yt(2) 
End
