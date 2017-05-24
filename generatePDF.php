<?php
require('fpdf/fpdf.php');
/*if(isset($_POST['data'])) {
    $data = json_decode($_POST['data']);
}
if(isset($_POST['headers'])) {
    $header = json_decode($_POST['headers']);
}*/
$data = array(
    array('subject' => 'Accidents', 'headline' => 'Car Accidents', 'date' => '01/01/1990', 'page' => '1'),
    array('subject' => 'Library', 'headline' => 'Grace A. Dow', 'date' => '02/02/2000', 'page' => '2')
);
$header = array('Subject', 'Headline', 'Date', 'Page');
class PDF extends FPDF
{
    // Load data
    function LoadData($file)
    {
        // Read file lines
        $lines = file($file);
        $data = array();
        foreach($lines as $line)
            $data[] = explode(';',trim($line));
        return $data;
    }

    // Simple table
    function BasicTable($header, $data)
    {
        // Header
        foreach($header as $col)
            $this->Cell(40,7,$col,1);
        $this->Ln();
        // Data
        foreach($data as $row)
        {
            foreach($row as $col)
                $this->Cell(40,6,$col,1);
            $this->Ln();
        }
    }

    // Better table
    function NewsIndexTable($header, $data)
    {
        // Table Title
        $w = array(190);
        // Title font style
        $this->SetFont('','B', 20);
        // Title
        $this->Cell($w[0], 12, "News Articles", 1, 0, 'C');
        $this->Ln();
        // Column widths
        $w = array(50, 105, 20, 15);
        // Set header font style
        $this->SetFont('','', 16);
        // Header cell styles
        $this->SetFillColor(211,211,211);
        // Header
        for($i=0;$i<count($header);$i++) {
            $this->Cell($w[$i],9,$header[$i],1,0,'C', true);
        }
        $this->Ln();
        // Set table font style
        $this->SetFont('', '', 10);
        // Cell styles
        $this->SetFillColor(232,232,232);
        $height = 5;
        // Data
        $fill = false;
        foreach($data as $row)
        {
            $this->Cell($w[0],$height,$row['subject'],'1', 0, 'L', $fill);
            $this->Cell($w[1],$height,$row['headline'],'1', 0, 'L', $fill);
            $this->Cell($w[2],$height,$row['date'],'1', 0, 'C', $fill);
            $this->Cell($w[3],$height,$row['page'],'1', 0, 'C', $fill);
            $this->Ln();
            $fill = !$fill;
        }
        // Closing line
   //     $this->Cell(array_sum($w),0,'','T');
    }

    // Colored table
    function FancyTable($header, $data)
    {
        // Colors, line width and bold font
        $this->SetFillColor(255,0,0);
        $this->SetTextColor(255);
        $this->SetDrawColor(128,0,0);
        $this->SetLineWidth(.3);
        $this->SetFont('','B');
        // Header
        $w = array(40, 35, 40, 45);
        for($i=0;$i<count($header);$i++)
            $this->Cell($w[$i],7,$header[$i],1,0,'C',true);
        $this->Ln();
        // Color and font restoration
        $this->SetFillColor(224,235,255);
        $this->SetTextColor(0);
        $this->SetFont('');
        // Data
        $fill = false;
        foreach($data as $row)
        {
            $this->Cell($w[0],6,$row[0],'LR',0,'L',$fill);
            $this->Cell($w[1],6,$row[1],'LR',0,'L',$fill);
            $this->Cell($w[2],6,number_format($row[2]),'LR',0,'R',$fill);
            $this->Cell($w[3],6,number_format($row[3]),'LR',0,'R',$fill);
            $this->Ln();
            $fill = !$fill;
        }
        // Closing line
        $this->Cell(array_sum($w),0,'','T');
    }
}
if(isset($header) && isset($data)) {
    $pdf = new PDF();
    // Column headings
    // Data loading
    $pdf->SetFont('Arial','',14);
 //   $pdf->AddPage();
  //  $pdf->BasicTable($header,$data);
    $pdf->AddPage();
    $pdf->NewsIndexTable($header,$data);
//    $pdf->AddPage();
 //   $pdf->FancyTable($header,$data);
    $pdf->Output();
}

?>